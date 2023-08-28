#!/usr/bin/env node

import fs from 'fs'
import { Command } from 'commander'

const program = new Command()

const dir_files = fs.readdir(__dirname, (err, files) => {
    if(err) throw new Error (err.message)
    console.log(files)
    return files
})

console.log(__dirname ,dir_files)
