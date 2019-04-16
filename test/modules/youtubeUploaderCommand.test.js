const YoutubeUploaderCommand = require('../../src/modules/YoutubeUploaderCommand');
const assert = require('chai').assert;
const sinon = require('sinon');
const mock = require('mock-fs');
const logger = require('winston');
const Youtube = require('youtube-api');
const csv = require('async-csv');

describe('YoutubeUploaderCommand class', () => {

  it('should have logger on construct', function () {
    let loggerMock = sinon.mock(logger);
    let youtubeApiMock = sinon.mock(Youtube);
    let csvParserMock = sinon.mock(csv);
    let input = 'input.csv';
    let output = 'output.csv';
    let credentials = {};

    mock({
      'input.csv': '{}',
      'output.csv': '{}',
    });

    let uploader = new YoutubeUploaderCommand(loggerMock, youtubeApiMock, csvParserMock, input, output, credentials);
    assert.equal(loggerMock, uploader.logger);

    loggerMock = null;
    assert.throw(
      () => {
        new YoutubeUploaderCommand(loggerMock, youtubeApiMock, csvParserMock, input, output, credentials);
      },
      Error,
      'Logger is not valid'
    );
  });

  it('should have the input file on construct', function () {
    let loggerMock = sinon.mock(logger);
    let youtubeApiMock = sinon.mock(Youtube);
    let csvParserMock = sinon.mock(csv);
    let input = 'input.csv';
    let output = 'output.csv';
    let credentials = {};

    mock({
      'input.csv': '{}',
      'output.csv': '{}',
    });

    let uploader = new YoutubeUploaderCommand(loggerMock, youtubeApiMock, csvParserMock, input, output, credentials);

    assert.equal(output, uploader.output);

    input = null;
    assert.throw(
      () => {
        new YoutubeUploaderCommand(loggerMock, youtubeApiMock, csvParserMock, input, output, credentials);
      },
      Error,
      `Input file 'null' doesnt exists`
    );
  });

  it('should have the output file on construct', function () {
    let loggerMock = sinon.mock(logger);
    let youtubeApiMock = sinon.mock(Youtube);
    let csvParserMock = sinon.mock(csv);
    let input = 'input.csv';
    let output = 'output.csv';
    let credentials = {};

    mock({
      'input.csv': '{}',
      'output.csv': '{}',
    });

    let uploader = new YoutubeUploaderCommand(loggerMock, youtubeApiMock, csvParserMock, input, output, credentials);

    assert.equal(output, uploader.output);

    output = null;
    assert.throw(
      () => {
        new YoutubeUploaderCommand(loggerMock, youtubeApiMock, csvParserMock, input, output, credentials);
      },
      Error,
      `Output file 'null' doesnt exists`
    );
  });

  it('should have the Youtube Api on construct', function () {
    let loggerMock = sinon.mock(logger);
    let youtubeApiMock = sinon.mock(Youtube);
    let csvParserMock = sinon.mock(csv);
    let input = 'input.csv';
    let output = 'output.csv';
    let credentials = {};

    mock({
      'input.csv': '{}',
      'output.csv': '{}',
    });

    let uploader = new YoutubeUploaderCommand(loggerMock, youtubeApiMock, csvParserMock, input, output, credentials);

    assert.equal(youtubeApiMock, uploader.youtubeApi);

    youtubeApiMock = null;
    assert.throw(
      () => {
        new YoutubeUploaderCommand(loggerMock, youtubeApiMock, csvParserMock, input, output, credentials);
      },
      Error,
      `Youtube Api not valid`
    );
  });

});
