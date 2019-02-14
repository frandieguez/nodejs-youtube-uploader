const yargs = require('yargs');
const console = require('console');
const {uploadVideos } = require('./../commands/commands');

class Cli {
  constructor(props) {
    this.config = props;
  }

  run() {
    this.args = yargs
      .options({
        input: {
          demand: true,
          alias: 'i',
        },
        output: {
          demand: true,
          alias: 'o',
        },
      })
      .command(
        'upload [input] [output]',
        `Parses a input CSV file containing metadata of videos and then uploads them to Youtube`,
        (yargs) => {
          yargs.positional('input', {
            type: 'string',
            describe: 'the input file in CSV format'
          });

          yargs.positional('output', {
            type: 'string',
            describe: 'the name to say hello to'
          })
        },
        uploadVideos
      )
      .help()
      .argv
  }
}

module.exports = { Cli };
