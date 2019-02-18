
const fs = require('fs');
const csv = require('async-csv');

/** Class that handles the video uploading processs. */
class YoutubeUploader {
  /**
   * Create the handler.
   * @param {string} input - Path to the input CSV file.
   * @param {string} output - Path to the output CSV file.
   */
  constructor(input, output) {
    this.input = input;
    this.output = output;
  }

  /**
   * Runs the command
   */
  async run() {
    // Parse the input file
    let results = await this.parseCsvFile(this.input);

    // Processs and upload each video
    results.map(async (video) => {
      var info = await this.uploadVideo(video)
      video.new_id = info;

      return video
    });

    // Save uplading results into the output file
    await this.saveOutputfile(this.output, results);
  }

  /**
   * Parses the input CSV file and returns an array
   *
   * @param {string} filePath The input file path to parse
   * @return {array}
   */
  parseCsvFile(filePath) {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Input file '${filePath}' doesnt exists`)
    }

    let input = fs.readFileSync(filePath);

    return csv.parse(input, { columns: true });
  }

  /**
   * Saves the uploading results to an output file
   *
   * @param {string} filePath The output file
   */
  async saveOutputFile(filePath, data) {
    let output = await csv.stringify(data, {columns: Object.keys(data[0])});

    return fs.writeFileSync(filePath, output);
  }

  /**
   * Uploads a video to youtube
   *
   * @param {Object} video the video object to use to upload it to youtube
   */
  uploadVideo(video) {
    return Math.random();
  }
}

module.exports = YoutubeUploader;
