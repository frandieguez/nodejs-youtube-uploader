const { Cli } = require('./cli/cli');
const process = require('process');

const cli = new Cli({
  token: process.env.YOUTUBE_TOKEN
});

cli.run();
