import fs from 'fs'
import { exec } from 'child_process'
import color from 'console-log-colors'

function ffmpeg(path: string, fileName: string, scale: number = 20): void {

    const splitIdx = fileName.indexOf('.')
    const outFile = fileName.slice(0, splitIdx)
    const resizedFile = `resized-${scale}px-${outFile}.jpg`

    if(fs.existsSync(`${path}/${resizedFile}`)) {
        console.log(color.yellow('skipping...'), color.bgRed(resizedFile), 'already exists')
        return
    }

    exec(`ffmpeg -i ${path}/${fileName} -vf scale=${scale}:-1 ${path}/${resizedFile} 2> /dev/null`, 
    (error, stdout, stderr) => {
        if(error) {
            console.error(color.red.bold('error  '),'unable to convert', color.redBG(fileName))
            return
        }
        if(stderr) {
            console.error(`stderr: ${stderr}`)
            return
        }
        console.log(color.green('✨success  '), fileName, color.greenBright('=>'), color.underline.green(`resized-${scale}px-${outFile}.jpg`))
    })
}

export function resize(folderPath: string, scale?: string) {

    let scaleAsNum: number = 20
    if(scale) {
        scaleAsNum = parseInt(scale)
    }

    let scaleError = 0

    try {
        const filesArr = fs.readdirSync(folderPath)

        const regex = /^resized-\d+px-/

        filesArr.forEach((file) => {

            if(file.match(regex)) {
                console.log(color.yellow('skipping...'), color.bgYellow(file), 'is a resized file')
                return
            }
            
            try {
                if(Number.isNaN(scaleAsNum)) {
                    if(scaleError === 0) {
                        console.log(color.red('error - invalid scale  '), color.dim('using default scale (20 pixels)'))
                    }
                    scaleError++
                    ffmpeg(folderPath, file)
                    return
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