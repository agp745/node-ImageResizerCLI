import fs from 'fs'

// ffmpeg -i imageName.jpg -vf scale=20:-1 imageName-small.jpg

export function resize(folderPath: string) {
    try {
        const filesArr = fs.readdirSync(folderPath)

        filesArr.forEach((file) => {
            try {
                console.log(file)
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
