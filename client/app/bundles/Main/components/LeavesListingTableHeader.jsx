import React, {PropTypes} from 'react';

export default class LeavesListingTableHeader extends React.Component {
    render() {
        return (
          <thead>
            <tr>
              <th data-field="id">Em. ID</th>
              <th data-field="name">Name</th>
              <th data-field="designation">Designation</th>
              <th data-field="applyed">Applyed Date</th>
              <th data-field="leave">Leave Date</th>
              <th data-field="by">Approved By</th>
              <th data-field="action"></th>
            </tr>
          </thead>
        );
    }
}
