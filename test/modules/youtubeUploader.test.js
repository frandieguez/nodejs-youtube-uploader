const YoutubeUploader = require('../../src/modules/YoutubeUploader');
const assert = require('chai').assert;
const sinon = require('sinon');

describe('YoutubeUploader class', () => {

  it('should have logger on construct', function() {
    let logger = sinon.mock();
    let youtubeApi = sinon.mock();
    let input = sinon.mock();
    let output = sinon.mock();

    let uploader = new YoutubeUploader(input, output, logger, youtubeApi);

    assert.equal(input, uploader.input);
    assert.equal(output, uploader.output);
    assert.equal(logger, uploader.logger);
    assert.equal(youtubeApi, uploader.youtubeApi);
    assert.equal(input, uploader.input);
  });

});
