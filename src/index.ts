#!/usr/bin/env node

import { Command } from 'commander'
import { resize } from './resize'
import { findDockerfile } from './dynamicDockerfile'

const program = new Command()

program
    .argument("<pathToFolder>", "path to folder with images")
    .option('-s, --scale <pixels>', 'scale image to pixle amount (default = 20)')
    .option('-d, --docker', 'use ffmpeg in a docker container')
    .action((pathToFolder: string) => {
        const options = program.opts()

        if(options.docker) {
            findDockerfile(pathToFolder)
        } else if(options.scale) {
            resize(pathToFolder, options.scale)
        } else {
            resize(pathToFolder)
        }
    })
    .description('resizes all images in folder')

program.parse(process.argv)