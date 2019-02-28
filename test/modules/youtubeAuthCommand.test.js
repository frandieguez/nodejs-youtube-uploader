const YoutubeAuthCommand = require('../../src/modules/YoutubeAuthCommand');
const assert = require('chai').assert;
const sinon = require('sinon');
const mock = require('mock-fs');
const logger = require('winston');

describe('YoutubeAuthCommand class', () => {

  it('should have logger on construct', function () {
    let loggerMock = sinon.mock(logger);
    let authFile = 'credentials.json';
    let force = false;

    mock({
      'credentials.json': '{}',
    });

    let uploader = new YoutubeAuthCommand(loggerMock, authFile, force);

    assert.equal(loggerMock, uploader.logger);
  });

});
