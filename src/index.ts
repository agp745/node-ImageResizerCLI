#!/usr/bin/env node

import { Command } from 'commander'
import { resize } from './resize'

const program = new Command()

program
    .argument("<pathToFolder>", "path to folder with images")
    .action((pathToFolder: string) => {
        resize(pathToFolder)
    })
    .description('resizes all images in folder')

program.parse(process.argv)