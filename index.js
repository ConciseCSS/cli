#!/usr/bin/env node

const cliParse = require('cliparse');
const chokidar = require('chokidar');
const path = require('path');
const preprocessor = require('@concisecss/preprocessor').default;

const pkg = require('./package.json');
const fs = require('fs');

const compile = (input, output, watch) => {
  // Write compiled file
  fs.writeFile(output, preprocessor(input), (err) => {
    if (err) { throw err; }

    console.log(`File written (${new Date(Date.now()).toLocaleString()}): ${output}\nFrom: ${input}`);
  });

  // Watch for changes if the -w option is set
  if (watch) {
    chokidar.watch(`${path.dirname(input)}/**/*.ccss`).on('all', (event, path) => {
      fs.writeFile(output, preprocessor(input), (err) => {
        if (err) { throw err; }

        console.log(`File written (${new Date(Date.now()).toLocaleString()}): ${output}\nFrom: ${input}`);
      });
    });
  }
};



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
}));
