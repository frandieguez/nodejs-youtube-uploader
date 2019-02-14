const csvdata = require('csvdata');
const fs = require('fs');

let uploadVideos = (options) => {
  console.log(options.input, options.output);
};

module.exports = { uploadVideos }
