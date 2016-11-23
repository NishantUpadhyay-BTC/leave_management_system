import React, { PropTypes } from 'react';
import MainWidget from '../components/MainWidget';
import Chart from '../components/Chart';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Dashboard from '../components/Dashboard';
import Holidays from '../components/Holidays'
export default class Main extends React.Component {


  render() {
    return (
      <div>
        <Header />
        <Holidays />
        <Footer />
      </div>
    );
  }
}
