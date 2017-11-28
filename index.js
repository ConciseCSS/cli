#!/usr/bin/env node

const cliParse = require('cliparse')
const pkg = require('./package.json')
const compile = require('./lib/compile')

cliParse.parse(cliParse.cli({
  name: 'concise-cli',
  description: 'Command-line Interface for Concise CSS',
  version: pkg.version,
  commands: [
    compile
  ]
}))
