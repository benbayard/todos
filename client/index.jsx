import React       from 'react';
import { Router }  from 'react-router';
import { history } from 'react-router/lib/History';
import routes      from 'routes';
React.render(
  <Router children={routes} history={history} />,
  document.getElementById('react-view')
);
