const { Cli } = require('../../src/cli/cli');
const assert = require('chai').assert;

describe('cli', () => {

  it('should have a commander', function() {
    const cli = new Cli();

    assert.isObject(cli.command);
  });

});
