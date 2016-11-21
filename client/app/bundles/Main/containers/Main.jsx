import React, { PropTypes } from 'react';
import MainWidget from '../components/MainWidget';
import Chart from '../components/Chart';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class Main extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = { name: this.props.name };
  }

  updateName(name) {
    this.setState({ name });
  }

  render() {
    return (
      <div>
        <Header />
        <Footer />
      </div>
    );
  }
}
