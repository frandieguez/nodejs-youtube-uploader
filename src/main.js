const yargs    = require('yargs')
const { join } = require('path')

try {
  // Load commands from directory
  yargs
    .commandDir(join(__dirname, 'commands'))
    .demand(1)
    .help()
    .argv
} catch (err) {
  // Command failed, lets catch the error and exit
  console.error('Command failed:', err.message || err)

  if (err.stack) {
    console.error(err.stack)
  }

  process.exit(1)
}
