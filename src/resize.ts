import fs from 'fs'
import { exec } from 'child_process'

function ffmpeg(path: string, fileName: string, scale: number = 20): void {

    const splitIdx = fileName.indexOf('.')
    const outFile = fileName.slice(0, splitIdx)

    exec(`ffmpeg -i ${path}/${fileName} -vf scale=${scale}:-1 ${path}/small-${outFile}.jpg 2> /dev/null`, 
    (error, stdout, stderr) => {
        if(error) {
            console.error(`Error 1: ${error.message}`)
            return
        }
        if(stderr) {
            console.error(`Error 2: ${stderr}`)
            return
        }
        console.log(`\n✨  ${fileName} => small-${outFile}.jpg`)
    })
}

export function resize(folderPath: string) {
    try {
        const filesArr = fs.readdirSync(folderPath)

        filesArr.forEach((file) => {
            try {
                ffmpeg(folderPath, file)
            } catch(err) {
                if(err instanceof Error) {
                    throw new Error (err.message)
                }
                console.log(String(err))
            }
        })

    } catch(err) {
        if(err instanceof Error) {
            throw new Error (err.message)
        }
        console.log(String(err))
    }
}
