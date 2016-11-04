import React, { PropTypes } from 'react';
import MainWidget from '../components/MainWidget';

// Simple example of a React "smart" component
export default class Main extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <MainWidget />
      </div>
    );
  }
}
