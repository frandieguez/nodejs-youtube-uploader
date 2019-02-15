const yargs    = require('yargs')
const { join } = require('path')

require('dotenv').config();

yargs
  .commandDir(join(__dirname, 'commands'))
  .demand(1)
  .help()
  .argv
