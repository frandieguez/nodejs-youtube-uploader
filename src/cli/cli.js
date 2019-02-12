const commander = require('commander');
const console = require('console');

class Cli {
  constructor(props) {
    this.config = props;
    this.command = commander.version('0.0.1');

    this.command
      .command('upload')
      .description('Uploads videos to Youtube ')
      .option('-i, --input    <input>', 'The input file in CSV')
      .option('-o, --output   <output>', 'The output file in CSV')
      .option('-v, --verbose', 'Enable verbose mode')
      .action(this.upload);
  }

  upload(options) {
    console.log(options);
  }

  run() {
    this.command.parse(process.argv);
  }
}

module.exports = { Cli };
