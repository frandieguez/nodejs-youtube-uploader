const uploadCommand = require('../../src/commands/upload');
const assert = require('chai').assert;

describe('upload command', () => {

  it('should have the upload name', function() {
    assert.include(uploadCommand.command, 'upload');
  });

  it('should have a description', function() {
    assert.isNotEmpty(uploadCommand.desc);
  });

  it('should have an input parameter and is required', function() {
    assert.hasAnyKeys(uploadCommand.builder, ['input']);
    assert.isTrue(uploadCommand.builder.input.demand);
  });

  it('should have an output parameter and is required ', function() {
    assert.hasAnyKeys(uploadCommand.builder, ['output']);
    assert.isTrue(uploadCommand.builder.output.demand);
  });

});
