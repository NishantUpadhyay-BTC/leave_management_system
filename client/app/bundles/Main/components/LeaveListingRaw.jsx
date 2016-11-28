import React, {PropTypes} from 'react';

export default class LeaveListingRaw extends React.Component {
    render() {
        return (
          <tr>
            <td>{this.props.data.id}</td>
            <td>{this.props.data.name}</td>
            <td>{this.props.data.designation}</td>
            <td>{this.props.data.from_date}</td>
            <td>{this.props.data.to_date}</td>
            <td>{this.props.data.approved_by}</td>
            <td><a href="#"><span className="fa fa-share"></span></a></td>
          </tr>
        );
    }
}
