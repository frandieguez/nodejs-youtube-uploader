const YoutubeUploader = require('../modules/youtube');
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
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.Console()
    ]
  });

  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  //
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple()
    }));
  }

  let youtubeApi = {};

  let command = new YoutubeUploader(argv.input, argv.output, logger, youtubeApi);

  command.run()
}
