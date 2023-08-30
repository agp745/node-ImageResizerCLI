import fs from 'fs'
import { exec } from 'child_process'
import { cyanBright } from 'console-log-colors'

function createDockerfile(path: string) {

    const content = `
    FROM node:18

    WORKDIR /app

    COPY package*.json .

    RUN 

    ...
    `

    fs.writeFile(`${path}/Resized-Dockerfile`, content, (err) => {
        if(err) console.log(err)
    })
}

export function findDockerfile(path: string) {

    // const noDockerfileErr = 'find: Dockerfile: No such file or directory'
    exec('find Dockerfile',
    (error, stdout, stderr) => {
        if(stderr || error) {
            console.log(cyanBright(`✨ 🐳 Dockerfile created!`))
            createDockerfile(path)
        }
        // if(stderr) {
        //     console.error('stderr', stderr)
        // }
        console.log(stdout)
    })
}
