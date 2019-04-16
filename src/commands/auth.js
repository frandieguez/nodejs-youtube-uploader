const YoutubeAuthCommand = require('../modules/YoutubeAuthCommand');
const winston = require('winston');

exports.command = 'authenticate'
exports.desc =
  'Retrieves or updates the Youtube API tokens using a ' +
  'source .json file with tokens downloaded from GCP.'
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
