import React, {PropTypes} from 'react';

export default class LeavesListingTableHeader extends React.Component {
  constructor(props, context){
    super(props, context)
    this.col_header = this.col_header.bind(this)
  }

  col_header() {
    switch (this.props.requestType) {
      case 'approved_requests':
        return <th data-field="leave">Approved By</th>;
      case 'rejected_requests':
        return <th data-field="leave">Rejected By</th>;
      default:
        return null
    }
  }
  render() {
    return (
      <thead>
        <tr>
            <th data-field="id">ID</th>
            <th data-field="name">Name</th>
            <th data-field="designation">Subject</th>
            <th data-field="applyed">Leave From.</th>
            <th data-field="leave">Leave To.</th>
            {this.col_header()}
            <th data-field="action"></th>
        </tr>
      </thead>
    );
  }
}
