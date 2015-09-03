import promiseMiddleware from './promised-middleware';
import sinon             from 'sinon';
var expect = require('chai').expect;

describe('promiseMiddleware', () => {
  var next;
  const action = {};
  var promiseAction;
  var type = 'TEST';
  beforeEach(() => {
    next = sinon.spy();
    var promise = new Promise((resolve, reject) => {
      setTimeout(resolve, 1);
    });
    promiseAction = {
      promise,
      type
    };
  });
  it('should go to the next action if there is no promise', () => {
    var computedMiddleware = promiseMiddleware()(next)(action);
    expect(next.calledWith(action)).to.be.true;
  });
  it('should call next if a promise is supplied', (done) => {
    var mockNext = (action) => {
      if (action.type === type + "_REQUEST") {
        // carry on...
        return;
      } else {
        if (action.type === type) {
          done();
        } else {
          done(new Error('promise did not succeed'));
        }
      }
    }
    var computedMiddleware = promiseMiddleware()(mockNext)(promiseAction);
  });
});
