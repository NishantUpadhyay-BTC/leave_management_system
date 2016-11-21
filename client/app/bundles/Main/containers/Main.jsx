import React, { PropTypes } from 'react';
import MainWidget from '../components/MainWidget';
import Chart from '../components/Chart';
import Header from '../components/Header';

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
        <MainWidget name={this.state.name} updateName={e => this.updateName(e)} />
        <Chart />
      </div>
    );
  }
}
