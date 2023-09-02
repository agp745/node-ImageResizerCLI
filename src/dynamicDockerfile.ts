import fs from 'fs'
import { spawn } from 'child_process'
import color from 'console-log-colors'
import { getErrorMessage } from './utils/errorMessage'
import { inherits } from 'util'

const buildCmd = `docker build -t resizecli-image -f ./Dockerfile.dev .`
const buildArgs = buildCmd.split(' ').splice(1)

const runCmd = `docker run --rm -v .:/app resizecli-image`
const runArgs = runCmd.split(' ').splice(1)

const removeImageCmd = 'docker rmi resizecli-image'
const removeImageArgs = removeImageCmd.split(' ').splice(1)

const removeFilesCmd = "find . -name 'Dockerfile.dev' | xargs rm"
const removeFilesArgs = ['-c', removeFilesCmd]

export function createDockerfile(path: string, scale: number = 20): void {

    const dockerfile = `
    FROM node:18

    WORKDIR /app

    COPY package*.json ./

    RUN npm install

    RUN apt update && apt install -y ffmpeg

    COPY . .

    CMD ["npx", "resize", "${path}", "-s", "${scale}"]
    `

    fs.writeFile('./.dockerignore', 'node_modules\ndist\n**/.DS_Store', (err) => {
        if(err) {
            console.error(getErrorMessage(err))
        }
    })

    fs.writeFile(`./Dockerfile.dev`, dockerfile, (err) => {
        if(err) {
            console.error(getErrorMessage(err))
        }

        console.log(color.cyanBright(`✨ 🐳 Dockerfile created!`))
        buildImage()
    })
}

function buildImage(): void {
    console.log(color.yellow('building image...'), color.dim(buildCmd))

    const build = spawn('docker', buildArgs, {stdio: 'inherit'})
    build.on('close', (code) => {
        if(code === 0) {
            console.log('\n')
            runImage()
        }
    })
}

function runImage() {
    console.log(color.yellow('running image...'), color.dim(runCmd))

    const run = spawn('docker', runArgs, {stdio: 'inherit'})

    run.on('close', (code, signal) => {
        if(code === 0) {
            removeDocker()
        } else {
            console.log(color.red(`process exited with code: ${code}\nsignal: ${signal}`))
        }
    })
}

function removeDocker() {
    console.log(color.yellow('removing image...'), color.dim(removeImageCmd))

    const rmi = spawn('docker', removeImageArgs, {stdio: 'inherit'})
    rmi.on('close', (code, signal) => {
        if(code === 0) {
            console.log(color.yellow('removing Dockerfile.dev...'), color.dim(removeFilesCmd))
            const rmFile = spawn('/bin/sh', removeFilesArgs, {stdio: 'inherit'})

            rmFile.on('close', (code) => {
                if(code === 0) console.log(color.cyanBright('🐳  Dockerfile.dev removed'))
            })
        } else {
            console.log(color.red(`process exited with code: ${code}\nsignal: ${signal}`))
        }
    })
}