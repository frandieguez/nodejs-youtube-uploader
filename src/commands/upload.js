const YoutubeUploader = require('../modules/YoutubeUploader');
const winston = require('winston');

exports.command = 'upload [input] [output]'
exports.desc =
  'Parses an input CSV file containing metadata of '
  + 'videos and then uploads them to Youtube'
exports.builder = (yargs) => yargs
  .option('auth', {
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

  let youtubeApi = {};

  let command = new YoutubeUploader(argv.input, argv.output, logger, youtubeApi);

  command.run()
}
