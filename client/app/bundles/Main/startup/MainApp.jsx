import React from 'react';
import ReactOnRails from 'react-on-rails';

import Main from '../containers/Main';

const MainApp = (props) => (
  <Main {...props} />
);

// This is how react_on_rails can see the HelloWorldApp in the browser.
ReactOnRails.register({ MainApp });
