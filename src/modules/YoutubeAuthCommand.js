const Youtube = require('youtube-api')
const fs = require('fs')
const Lien = require('lien');
const opn = require('opn')

/** Class that handles the video uploading processs. */
class YoutubeAuthCommand {

  /**
   * Create the handler.
   * @param {string}  input - Path to the input CSV file.
   * @param {string}  output - Path to the output CSV file.
   * @param {Object}  logger - The logger object to output logs into console
   * @param {Object}  youtubeApi - The youtubeApi gateway to upload videos to youtube
   * @param {Boolean} force - Whether to force the regeneration of access and refresh token
   */
  constructor(logger, authFile, force) {
    this.logger = logger;
    this.authFile = authFile;
    this.force = force

    let youtubeAuth = JSON.parse(fs.readFileSync(this.authFile));

    this.credentials = youtubeAuth;
  }

  async run() {
    if (this.credentials.installed.access_token && !this.force) {
      this.logger.info('We already have an access token, now you can execute the upload command …')
    } else {
      this.logger.info('We do not have access_token so requiresting it...');

      let params = {
        type: 'oauth',
        client_id: this.credentials.installed.client_id,
        client_secret: this.credentials.installed.client_secret,
        redirect_url: 'http://localhost:5000/oauth2callback'
      }

      // Authenticate
      // You can access the Youtube resources via OAuth2 only.
      // https://developers.google.com/youtube/v3/guides/moving_to_oauth#service_accounts
      this.oauth = Youtube.authenticate(params);

      opn(
        this.oauth.generateAuthUrl({
          access_type: 'offline',
          scope: ['https://www.googleapis.com/auth/youtube.upload']
        })
      );

      // Init lien server
      let server = new Lien({
        host: 'localhost',
        port: 5000
      })

      // Handle oauth2 callback
      server.addPage('/oauth2callback', (lien) => {
        this.logger.info('Trying to get the token using the following code: ' + lien.query.code);
        this.oauth.getToken(lien.query.code, (err, tokens) => {
          if (err) {
            lien.lien(err, 400)
            return this.logger.error(err)
          }

          this.oauth.setCredentials(tokens)

          lien.end('The video is being uploaded. Check out the logs in the terminal.')

          this.credentials.installed.access_token = tokens.access_token;
          this.credentials.installed.refresh_token = tokens.refresh_token;

          fs.writeFileSync(this.authFile, JSON.stringify(this.credentials));

          this.logger.info(`Saving access_token and refresh_token into the file ${this.authFile}`);

          process.exit(0);
        });
      });

    }
  }
}

module.exports = YoutubeAuthCommand
