const yargs = require('yargs')
const {
  join
} = require('path')

try {

  yargs
    .commandDir(join(__dirname, 'commands'))
    .demand(1)
    .help()
    .argv

} catch (err) {
  console.error('Command failed:', err.message || err)
  if (err.stack) {
    console.error(err.stack)
  }
  process.exit(1)
}
