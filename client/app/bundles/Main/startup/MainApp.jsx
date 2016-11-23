import React from 'react';
import ReactOnRails from 'react-on-rails';
import { Router, browserHistory } from 'react-router';
import routes from '../routes/routes';

const MainApp = (props, railsContext) => {
  let error;
  let redirectLocation;
  let routeProps;
  const { location } = railsContext;

  return (
    <Router history={browserHistory} children={routes} {...props} />
  );
};
ReactOnRails.register({ MainApp });
