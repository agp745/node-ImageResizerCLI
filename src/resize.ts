import fs from 'fs'
import { exec } from 'child_process'
import { red, redBG } from 'console-log-colors'

function ffmpeg(path: string, fileName: string, scale: number = 20): void {

    const splitIdx = fileName.indexOf('.')
    const outFile = fileName.slice(0, splitIdx)

    exec(`ffmpeg -i ${path}/${fileName} -vf scale=${scale}:-1 ${path}/resized-${scale}px-${outFile}.jpg 2> /dev/null`, 
    (error, stdout, stderr) => {
        if(error) {
            console.error(red.bold('error  '),'unable to convert', redBG(fileName))
            return
        }
        if(stderr) {
            console.error(`stderr: ${stderr}`)
            return
        }
        console.log(`\n✨  ${fileName} => resized-${scale}px-${outFile}.jpg`)
    })
}

export function resize(folderPath: string, scale?: string) {

    let scaleAsNum: number = 20
    if(scale) {
        scaleAsNum = parseInt(scale)
    }

    try {
        const filesArr = fs.readdirSync(folderPath)

        const regex = /^resized-\d+px-/

        filesArr.forEach((file) => {

            if(file.match(regex)) {
                return
            }
            
            try {
                if(Number.isNaN(scaleAsNum)) {
                    ffmpeg(folderPath, file)
                    console.log('invalid scale... using default scale of 20 pixels')
                }
                ffmpeg(folderPath, file, scaleAsNum)
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
