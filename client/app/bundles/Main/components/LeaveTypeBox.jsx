import React, { PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import * as LeaveTypeActions from './../actions/LeaveTypeActions';

class LeaveTypeBox extends React.Component {

  constructor(props,context){
    super(props,context);
    this.deleteSignOffType = this.deleteSignOffType.bind(this);
  }

  deleteSignOffType(){
    this.props.actions.deleteLeavetype(this.props.data.id);
  }

  render() {
    return(
      <div className="col m4">
        <div className="holiday-box">
          <h5>{this.props.data.sign_off_type_name }</h5>
          <div className="date">{this.props.data.description}</div>
          <div className="action">
            <a href="#" className="btn-flat blue waves-effect waves-light"><span className="fa fa-pencil"></span></a>
            <a href="#" onClick={this.deleteSignOffType} className="btn-flat red waves-effect waves-light"><span className="fa fa-trash"></span></a>
          </div>
        </div>
      </div>
    )
  }
}


LeaveTypeBox.propTypes = {
  data: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps){
  return {
      leave_types: state.leave_types
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(LeaveTypeActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(LeaveTypeBox);
