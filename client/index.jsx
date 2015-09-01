import React       from 'react';
import { Router }  from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import routes      from '../shared/routes';
import Location from 'react-router/lib/Location';
import { createStore, combineReducers } from 'redux';
import { Provider }                     from 'react-redux';
import * as reducers                    from 'reducers';
import { fromJS }                       from 'immutable';
let initialState = window.__INITIAL_STATE__;
var location = new Location(window.location.pathname, window.location.search);
Object.keys(initialState)
      .forEach(key => {
        initialState[key] = fromJS(initialState[key]);
      });
const reducer = combineReducers(reducers);
const store   = createStore(reducer, initialState);

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
