import React, {PropTypes} from 'react';

export default class LeaveListingRaw extends React.Component {
    render() {
        return (
          <tr>
            <td>{this.props.data.id}</td>
            <td>{this.props.data.username}</td>
            <td>{this.props.data.reason}</td>
            <td>{this.props.data.date_from}</td>
            <td>{this.props.data.date_to}</td>
            <td><a href="#"><span className="fa fa-share"></span></a></td>
          </tr>
        );
    }
}
