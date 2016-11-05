import React, { PropTypes } from 'react';
global.Highcharts = require('highcharts');
require('highcharts/modules/exporting')(global.Highcharts);
import ReactHighcharts from 'react-highcharts';

// Simple example of a React "smart" component
export default class Chart extends React.Component {

  render() {
    let config = {
      chart: {type: 'column'},
      title: {
            text: 'Monthly Average Rainfall'
        },
      subtitle: {
          text: 'Source: WorldClimate.com'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      series: [{
        data: [0,2,4,3,2,1,3,4,6,7]
      }]
    };
    return (
      <div>
        <ReactHighcharts config = {config}></ReactHighcharts>
      </div>
    );
  }
}
