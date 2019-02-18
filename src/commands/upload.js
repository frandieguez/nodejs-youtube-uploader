const YoutubeUploader = require('../modules/YoutubeUploader');
const winston = require('winston');

exports.command = 'upload [input] [output]'
exports.desc =
  'Parses a input CSV file containing metadata of '
  + 'videos and then uploads them to Youtube'
exports.builder = {
  input: {
    demand: true,
    alias: 'i',
  },
  output: {
    demand: true,
    alias: 'o',
  },
}
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
