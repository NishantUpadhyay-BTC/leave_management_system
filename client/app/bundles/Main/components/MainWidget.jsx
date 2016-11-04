// HelloWorldWidget is an arbitrary name for any "dumb" component. We do not recommend suffixing
// all your dumb component names with Widget.

import React, { PropTypes } from 'react';

// Simple example of a React "dumb" component
export default class MinWidget extends React.Component {
  render() {

    return (
      <div className="container">
        <h3>
          Hello World
        </h3>
      </div>
    );
  }
}
