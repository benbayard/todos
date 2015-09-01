import React     from 'react';
import { Route } from 'react-router';
import App from 'components';
import Home from 'components/home';
const routes = (
  <Route name="app" component={App} path="/">
    <Route component={Home} path="home" />
  </Route>
);
export default routes;
