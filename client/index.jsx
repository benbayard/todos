import React                            from 'react';
import { Router }                       from 'react-router';
import BrowserHistory                   from 'react-router/lib/BrowserHistory';
import routes                           from '../shared/routes';
import Location                         from 'react-router/lib/Location';
import { createStore, combineReducers } from 'redux';
import { Provider }                     from 'react-redux';
import * as reducers                    from 'reducers';
import { fromJS }                       from 'immutable';
import RethinkdbWebsocketClient         from 'rethinkdb-websocket-client';
import rethinkMiddlewareMaker           from '../utils/middleware/rethink-middleware';
import { applyMiddleware }              from 'redux';
/* ************************************************************************* */
const r = RethinkdbWebsocketClient.rethinkdb;
const dbOptions = {
  r,
  connector: RethinkdbWebsocketClient,
  config   : {
    host              : 'localhost', // hostname of the websocket server
    port              : 8015, // port number of the websocket server
    path              : '/', // HTTP path to websocket route
    wsProtocols       : ['binary'], // sub-protocols for websocket, required for websockify
    secure            : false, // set true to use secure TLS websockets
    db                : 'todos', // default database, passed to rethinkdb.connect
  }
};
const rethinkMiddleware = rethinkMiddlewareMaker(dbOptions);
const initialState = window.__INITIAL_STATE__;
const location = new Location(window.location.pathname, window.location.search);
Object.keys(initialState)
      .forEach(key => {
        initialState[key] = fromJS(initialState[key]);
      });
const reducer = combineReducers(reducers);
const store   = applyMiddleware(rethinkMiddleware)(createStore)(reducer);

React.render(
  <Provider store={store}>
    {() =>
      <Router children={routes} history={new BrowserHistory()} />
    }
  </Provider>,
  document.getElementById('react-view')
);

// Router.run(routes, location, (err, routeState) => {
//
// });
