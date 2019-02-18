const YoutubeUploader = require('../modules/youtube');

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
  let command = new YoutubeUploader(argv.input, argv.output);

  command.run()
}
