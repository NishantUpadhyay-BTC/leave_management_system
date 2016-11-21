import React, { PropTypes } from 'react';
export default class HolidayBox extends React.Component {
  render() {
    return(
      <div className="col m4">
        <div className="holiday-box">
          <h5>{this.props.data.name}</h5>
          <div className="date">{this.props.data.date}</div>
          <div className="action">
            <a href="#editholiday" className="btn-flat blue waves-effect waves-light"><span className="fa fa-pencil"></span></a>
            <a href="#" className="btn-flat red waves-effect waves-light"><span className="fa fa-trash"></span></a>
          </div>
        </div>
      </div>
    )
  }
}
