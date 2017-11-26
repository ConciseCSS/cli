#!/usr/bin/env node

const cliParse = require('cliparse')
const chokidar = require('chokidar')
const path = require('path')
const preprocessor = require('@concisecss/preprocessor').default
const chalk = require('chalk')
const fs = require('fs')

const pkg = require('./package.json')

cliParse.parse(cliParse.cli({
  name: 'concise-cli',
  description: 'Command-line Interface for Concise CSS',
  version: pkg.version,
  commands: [
    cliParse.command(
      'compile', {
        description: 'Compile code from Concise CSS',
        args: [
          cliParse.argument('input', { description: 'File to compile' }),
          cliParse.argument('output', { description: 'Output CSS file' })
        ],
        options: [
          cliParse.flag('watch', {
            aliases: ['w'],
            description: 'Watch for file changes'
          })
        ]
      },
      params => compile(params.args[0], params.args[1], params.options.watch)
    )
  ]
}))

function compile(input, output, isWatching) {
  preprocessor(input).then(result =>
    writeFile(input, output, result))

  // Watch for changes if the -w option is set
  if (isWatching) {
    chokidar
      .watch(`${path.dirname(input)}/**/*.ccss`)
      .on('all', (event, path) =>
        preprocessor(input).then(result =>
          writeFile(input, output, result)))
  }
}

function writeFile(input, output, content) {
  fs.writeFile(output, content, err => {
    if (err) { throw err }

    const currentDate = new Date(Date.now()).toLocaleString([], {
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    })

    console.log(chalk.green(`File written at ${currentDate}`))
    console.log(`${chalk.blue('Input:')} ${input}`)
    console.log(`${chalk.blue('Output:')} ${output}`)
  })
}
