const chalk = require('chalk')
const fs = require('fs')

module.exports = (input, output, content) => {
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
