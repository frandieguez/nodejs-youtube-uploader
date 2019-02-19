const fs = require('fs');
const csv = require('async-csv');
const Youtube = require('youtube-api');

/** Class that handles the video uploading processs. */
class YoutubeUploaderCommand {

  /**
   * Create the handler.
   * @param {string} input - Path to the input CSV file.
   * @param {string} output - Path to the output CSV file.
   * @param {Object} logger - The logger object to output logs into console
   * @param {Object} youtubeApi - The youtubeApi gateway to upload videos to youtube
   */
  constructor(input, output, logger, credentials) {
    this.input = input;
    this.output = output;
    this.logger = logger;
    this.credentials = credentials;

    if (!fs.existsSync(this.input)) {
      throw new Error(`Input file '${this.input}' doesnt exists`)
    }

    if (!fs.existsSync(this.output)) {
      throw new Error(`Output file '${this.output}' doesnt exists`)
    }
  }

  /**
   * Runs the command
   */
  async run() {
    this.oauth = await Youtube.authenticate({
      type: 'oauth',
      client_id: this.credentials.installed.client_id,
      client_secret: this.credentials.installed.client_secret,
      redirect_url: 'http://localhost:5000/oauth2callback',
      access_token: this.credentials.installed.access_token,
    });

    try {
      // Parse the input file
      let results = await this.parseCsvFile(this.input);

      // Iterate over all videos and upload them.
      for (let index = 0; index < results.length; index++) {
        const video = results[index];
        let result = await this.uploadVideo(video)
        console.log(`finished ${result}`);
      }

      // Save uplading results into the output file
      await this.saveOutputfile(this.output, results);
    } catch (err) {
      this.logger.error(`There was an general error: ${err}`);
    }
  }

  /**
   * Parses the input CSV file and returns an array
   *
   * @param {string} filePath The input file path to parse
   * @return {array}
   */
  parseCsvFile(filePath) {
    let input = fs.readFileSync(filePath);

    return csv.parse(input, {
      columns: true
    });
  }

  /**
   * Saves the uploading results to an output file
   *
   * @param {string} filePath The output file
   */
  async saveOutputfile(filePath, data) {
    let output = await csv.stringify(data);

    return fs.writeFileSync(filePath, output);
  }

  /**
   * Uploads a video to youtube
   *
   * @param {Object} video the video object to use to upload it to youtube
   */
  async uploadVideo(video) {
    this.logger.info(`Uploading video: ${video.title}`)
    try {
      // var req =
      await Youtube.videos.insert({
          resource: {
            // Video title and description
            snippet: {
              title: video.title,
              description: video.description,
            },
            // I don't want to spam my subscribers
            status: {
              privacyStatus: 'public'
            }
          },
          // This is for the callback function
          part: 'snippet,status',

          // Create the readable stream to upload the video
          media: {
            body: fs.createReadStream(video.file)
          }
        },
        (err, data) => {
          this.logger.info(err, data, 'Done.')
          // process.exit()
          return video;
        }
      )
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = YoutubeUploaderCommand;
