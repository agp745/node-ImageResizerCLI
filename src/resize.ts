import fs from 'fs'
import { exec } from 'child_process'

// ffmpeg -i imageName.jpg -vf scale=20:-1 imageName-small.jpg

function ffmpeg(fileName: string, scale: number = 20): void {

    const splitIdx = fileName.indexOf('.')
    const outFile = fileName.slice(0, splitIdx)

    exec(`ffmpeg -i ${fileName} -vf scale=${scale}:-1 small-${outFile}.jpg`, 
    (error, stdout, stderr) => {
        if(error) {
            console.error(`Error: ${error.message}`)
            return
        }
        if(stderr) {
            console.error(`Error: ${stderr}`)
            return
        }
        console.log(`images resized successfully\noutput: ${stdout}`)
    })
}

export function resize(folderPath: string) {
    try {
        const filesArr = fs.readdirSync(folderPath)

        filesArr.forEach((file) => {
            try {
                ffmpeg(file)
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
