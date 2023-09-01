import fs from 'fs'
import { exec, spawn } from 'child_process'
import { cyanBright, yellow, red, dim, green } from 'console-log-colors'
import { getErrorMessage } from './utils/errorMessage'
import { error } from 'console'
import { stderr } from 'process'

// docker run -v /path/on/host:/path/in/container my_image
// figure out way to find package.json
// && apk update && apk add ffmpeg

export function createDockerfile(path: string, scale: number = 20): void {

    const dockerfile = `
    FROM node:18

    WORKDIR /app

    COPY package*.json ./

    RUN npm install

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

        console.log(cyanBright(`✨ 🐳 Dockerfile created!`))

        buildImage(path)
    })
}

function buildImage(path: string): void {
    const buildCmd = `docker build -t resizecli-image -f ./Dockerfile.dev .`
    const runCmd = `docker run -v ${path}:./app/${path} resizecli-image`

    console.log(yellow('running...'), dim(buildCmd))
    spawnImage(path)
    // exec(buildCmd, (error, stdout, stderr) => {
    //     if(error) {
    //         console.log(error.message)
    //     }
    //     if(stderr) {
    //         console.log('stderr', stderr)
    //     }
    //     console.log(stdout)

    //     console.log(yellow('running...'), runCmd)
    //     exec(runCmd, (error, stdout, stderr) => {
    //         if(error) {
    //             console.log(error.message)
    //             return
    //         }
    //         if(stderr) {
    //             console.log('stderr', stderr)
    //             return
    //         }
    //         console.log(stdout)
    //     }) 
    // })
}

function spawnImage(path: string): void {
    const buildArgs = ['build', '-t', 'resizecli-image', '-f', './Dockerfile.dev', '.']
    
    const build = spawn('docker', buildArgs)

    build.stdout.on('readable', () => {
        let chunk: Buffer | null = build.stdout.read()
        while(chunk !== null) {
            console.log(chunk.toString())
        }
    })

    build.stdout.on('error', (err) => {
        console.log(red.bold('error  '), err.message)
    })

    build.stderr.on('data', () => {
        console.log(red.bold('stderr'), stderr)
    })

    // build.stdout.on('close', () => {
    //     runImage(path)
    // })
}

function runImage(path: string) {
    `docker run -v ${path}:./app/${path} resizecli-image`
    const runArgs = ['run', '-v', `.:/app`, 'resizecli-image', '--name', 'resize-cli-container' ]

    const run = spawn('docker', runArgs)

    run.stdout.on('readable', () => {
        let chunk
        while((chunk = run.stdout.read()) !== null) {
            console.log(chunk.toString())
        }
    })

    run.stdout.on('error', (err) => {
        console.log(red.bold('error  '), err.message)
    })

    run.stderr.on('data', () => {
        console.log(red.bold('stderr'), stderr)
    })

    run.stdout.on('close', () => {
        console.log(green.bold('success '), 'images resized')
    })
}