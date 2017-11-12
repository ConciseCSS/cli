#!/usr/bin/env node

const cliParse = require('cliparse');
const compile = require('@concisecss/preprocessor');

const pkg = require('./package.json');
const fs = require('fs');

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
        ]
      }, params => {
        fs.writeFile(params.args[1], compile(params.args[0]), (err) => {
          if (err) { throw err; }

          console.log(`File written: ${params.args[1]}\nFrom: ${params.args[0]}`);
        })
      }
    )
  ]
}));
