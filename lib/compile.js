const cliParse = require('cliparse')
const preprocessor = require('@concisecss/preprocessor').default
const writeFile = require('../utils/writeFile')
const path = require('path')
const chokidar = require('chokidar')

module.exports = cliParse.command(
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

function compile(input, output, isWatching) {

  // Watch for changes if the -w option is set
  if (isWatching) {
    chokidar
      .watch(`${path.dirname(input)}/**/*.ccss`)
      .on('ready', () => console.log('Compiling and watching for changes…'))
      .on('all', (event, path) =>
        preprocessor(input).then(result =>
          writeFile(input, output, result)))
  } else {
    preprocessor(input).then(result =>
      writeFile(input, output, result))
  }
}
