
const fs = require('fs');
const csv = require('async-csv')

class YoutubeUploader {
  constructor(props) {
    this.props = props;
  }

  async run() {
    let results = await this.parseCsvFile(this.props.input);
    console.log(results);
    console.log('init called for dir', this.props.input, this.props.output)
  }

  parseCsvFile(filePath) {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Input file '${filePath}' doesnt exists`)
    }

    let input = fs.readFileSync(filePath);

    return csv.parse(input, { columns: true });
  }
}

module.exports = YoutubeUploader;
