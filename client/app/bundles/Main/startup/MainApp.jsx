import React from 'react';
import ReactOnRails from 'react-on-rails';
import { Router, browserHistory } from 'react-router';
import Main from '../containers/Main';
import Contact from '../containers/Contact';
import { match, RouterContext } from 'react-router';
import { Route, IndexRoute } from 'react-router';
const MainApp = (props, railsContext) => {
  let error;
  let redirectLocation;
  let routeProps;
  const { location } = railsContext;

  // create your hydrated store

  // See https://github.com/reactjs/react-router/blob/master/docs/guides/ServerRendering.md

  // Important that you don't do this if you are redirecting or have an error.
  return (
    <Router history={browserHistory}>
       <Route path="/" component={Main}>
         <IndexRoute component={Main} />
         <Route path="contact" component={Contact}/>
       </Route>
     </Router>
  );
};

ReactOnRails.register({ MainApp });
