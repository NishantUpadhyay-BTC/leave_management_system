import React from 'react';
import ReactOnRails from 'react-on-rails';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import routes from '../routes/routes';
import configureStore from '../store/configureStore';

const store = configureStore();

const MainApp = (props, railsContext) => {
  let error;
  let redirectLocation;
  let routeProps;
  const { location } = railsContext;

  return (
    <Provider store={store}>
      <Router history={browserHistory} children={routes} {...props} />
    </Provider>
  );
};
ReactOnRails.register({ MainApp });
