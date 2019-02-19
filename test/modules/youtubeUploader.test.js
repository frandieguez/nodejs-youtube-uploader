const YoutubeUploaderCommand = require('../../src/modules/YoutubeUploaderCommand');
const assert = require('chai').assert;
const sinon = require('sinon');
const mock = require('mock-fs');


describe('YoutubeUploader class', () => {

  it('should have logger on construct', function () {
    let logger = sinon.mock();
    let youtubeApi = sinon.mock();
    let input = 'input.csv';
    let output = 'output.csv';

    mock({
      'input.csv': '{}',
      'output.csv': '{}',
    });

    let uploader = new YoutubeUploaderCommand(input, output, logger, youtubeApi);

    assert.equal(input, uploader.input);
    assert.equal(output, uploader.output);
    assert.equal(logger, uploader.logger);
    assert.equal(input, uploader.input);
  });

});
