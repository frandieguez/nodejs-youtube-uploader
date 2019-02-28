const YoutubeUploaderCommand = require('../modules/YoutubeUploaderCommand');
const winston = require('winston');
const fs = require('fs');
const csv = require('async-csv');
const Youtube = require('youtube-api');

exports.command = 'upload [input] [output]'
exports.desc =
  'Parses an input CSV file containing metadata of ' +
  'videos and then uploads them to Youtube'
exports.builder = (yargs) => yargs
  .option('config', {
    demand: true,
    alias: 'a',
  })
  .positional('input', {
    type: 'string',
    description: 'The CSV input file to get info from'
  })
  .positional('output', {
    type: 'string',
    description: 'The output CSV file',
    default: './output.csv'
  })
exports.example = '$0 upload input-file.csv output-file.csv'
exports.handler = (argv) => {

  const logger = winston.createLogger({
    level: 'info',
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        )
      })
    ]
  });

  let credentials = JSON.parse(fs.readFileSync(argv.config));

  let command = new YoutubeUploaderCommand(logger, Youtube, csv, argv.input, argv.output, credentials);

  command.run()
}
