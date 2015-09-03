export default function rethinkMiddlewareMaker(options = {}) {
  // options can have a `connector` property. If it does
  // then use that, otherwise, ues options.r.
  return () => next => action => {
    const { getRethink, type, ...rest } = action;
    if (!getRethink) {
      return next(action);
    }

    const SUCCESS = type;
    const REQUEST = type + '_OPTIMISTIC';
    const FAILURE = type + '_UTTER_FAILURE';

    const promise = ensurePromise(options);
    return promise
      .then(handlePromiseSuccess)
      .catch(handlePromiseError);
  };
};

function handlePromiseSuccess(connection) {
  next({ ...rest, connection, type: SUCCESS });
  return true;
}

function handlePromiseError(error) {
  next({ ...rest, error, type: FAILURE });

  // Another benefit is being able to log all failures here
  console.log(error);
  return false;
}

function ensurePromise(options) {
  new Promise((resolve, reject) {
    const config    = getConfiguration(options);
    const connector = determineConnector(options);
    return connector
      .connect(config);
  });
}

function getConfiguration(options) {
  return options.config || { host: 'localhost', port: 28015 };
};

function determineConnector(options) {
  return (options.connector === undefined) ? options.r : options.connector;
};
