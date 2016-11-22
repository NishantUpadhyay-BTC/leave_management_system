import React, { PropTypes } from 'react';
import { Router, Route, Link } from 'react-router'

export default class NotificationBox extends React.Component {
  componentDidMount(){
      $('.dropdown-button').dropdown();
  }
  render() {
    let leaveUrl = "leave_details/" + this.props.data.id
    return(
      <div className="item clearfix highlighted">
        <div className="image"></div>
        <div className="icons right">
          <a href="#" data-alignment="right" className="dropdown-button" data-activates='dropdown1'>&bull; &bull; &bull;</a>
          <ul id='dropdown1' className='dropdown-content'>
            <li><a href="#!" className="blue-text">Unread</a></li>
            <li><a href="#!" className="blue-text">Read</a></li>
            <li><a href="#!" className="blue-text">Uproved</a></li>
            <li><a href="#!" className="blue-text">Reject</a></li>
          </ul>
        </div>
        <div className="detail">

          <div className="title"><b>{this.props.data.name}</b><Link to={leaveUrl}>{this.props.data.subject}</Link></div>
          <div className="time">{this.props.data.time}</div>
        </div>
      </div>
    )
  }
}
