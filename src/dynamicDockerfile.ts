import fs from 'fs'
import { exec } from 'child_process'
import { cyanBright } from 'console-log-colors'

export function createDockerfile(path: string, scale: number = 20) {

    const content = `
    FROM node:18-alpine

    WORKDIR /app

    COPY package*.json ./

    RUN npm i && apk update && apk add ffmpeg

    COPY ${path} .

    CMD ["resize", ".", "-s", "${scale}"]
    `

    fs.writeFile(`${path}/Resized-Dockerfile`, content, (err) => {
        if(err) console.error(err)
        console.log(cyanBright(`✨ 🐳 Dockerfile created!`))
    })
}
