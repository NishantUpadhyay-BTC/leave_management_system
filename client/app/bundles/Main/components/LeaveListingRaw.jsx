import React, {PropTypes} from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'

export default class LeaveListingRaw extends React.Component {
  render() {
    let show_url = "leave_details/" + this.props.data.id
    return (
      <tr>
        <td>{this.props.data.id}</td>
        <td>{this.props.data.username}</td>
        <td>{this.props.data.reason}</td>
        <td>{this.props.data.date_from}</td>
        <td>{this.props.data.date_to}</td>
        <td><Link to={show_url}><span className="fa fa-share"></span></Link></td>
      </tr>
    );
  }
}
