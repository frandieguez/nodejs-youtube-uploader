const YoutubeAuthCommand = require('../modules/YoutubeAuthCommand');
const winston = require('winston');

exports.command = 'authenticate'
exports.desc =
  'Parses an input CSV file containing metadata of ' +
  'videos and then uploads them to Youtube'
exports.builder = (yargs) => yargs
  .option('config', {
    demand: true,
    alias: 'c',
  })
  .option('force', {
    demand: false,
    alias: 'f',
  })
exports.handler = async (argv) => {

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

  let command = new YoutubeAuthCommand(logger, argv.config, argv.force);

  await command.run();
}
