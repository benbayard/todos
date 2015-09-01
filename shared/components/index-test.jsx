// require('../../tests/testdom')('<html><body></body></html>');
var jsdom = require('mocha-jsdom');
jsdom();
import React from 'react/addons';

var TestUtils = React.addons.TestUtils;
var AppView   = require('./index');
var expect    = require('chai').expect;
describe('Index', () => {
  it('should have test', () => {
    var indexHTML = TestUtils.renderIntoDocument(<AppView />);
    var h1 = TestUtils.findRenderedDOMComponentWithTag(indexHTML, 'h1');
    expect(h1).to.exist;
  });
});
