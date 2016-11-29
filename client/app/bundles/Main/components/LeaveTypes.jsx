import React, { PropTypes } from 'react';
import LeaveTypeBox from './LeaveTypeBox'
import {bindActionCreators} from 'redux';
import Header from './Header';
import { connect } from 'react-redux'
import * as LeaveTypeActions from './../actions/LeaveTypeActions';

class LeaveTypes extends React.Component {
  constructor(props, context) {
      super(props, context);
      this.prepare_leave_types = this.prepare_leave_types.bind(this);
      this.addLeaveType = this.addLeaveType.bind(this);
  }

  componentWillMount(){
    this.props.actions.loadLeaveTypes();
  }

  addLeaveType(e){
    e.preventDefault();
    let noOfDays = this.refs.noOfDays.value;
    let leaveType = this.refs.leaveTypeName.value;
    let description = this.refs.leaveTypeDescription.value;
    this.props.actions.addSignOffType({ no_of_days: noOfDays, description: description, sign_off_type_name: leaveType});
    $('.modal').modal('close');
  }

  prepare_leave_types(leave_type){
    return <LeaveTypeBox key={leave_type.id} data = {leave_type} />
  }

  componentDidMount() {
    $('.modal').modal();
		$('.datepicker').pickadate({
			selectMonths: true, // Creates a dropdown to control month
			selectYears: 15,
			container: 'body'
		});
  }

  render(){
    return(
      <div>
        <div className="content">
        	<div className="container">
        		<div className="whitebg z-depth-2">
        			<div className="row">
        				<div className="col s12 right-align">
        					<a href="#addnewholiday" className="btn-floating green center-align"><span className="fa fa-plus"></span></a>
        				</div>
        			</div>
        			<div className="holiday-list">
        				<div className="row">
        					{ this.props.leave_types.map(leave_type => this.prepare_leave_types(leave_type))}
        				</div>
        			</div>
        		</div>
        	</div>
        </div>
        <div id="addnewholiday" className="modal holiday-form">
        	<form action="javascript:void(0);">
        		<div className="modal-content">
        			<h5>Add New Type</h5>
        			<div className="input-field">
        				<input type="text" name="leaveType" id="leaveType" ref="leaveTypeName" />
        				<label htmlFor="leaveType">Leave Type</label>
        			</div>
              <div className="input-field">
        				<input type="number" name="noOfDays" id="noOfDays" ref="noOfDays" />
        				<label htmlFor="noOfDays">Leave Type</label>
        			</div>
        			<div className="input-field">
        				<textarea id="textarea1" className="materialize-textarea" ref="leaveTypeDescription"></textarea>
        				<label htmlFor="textarea1">Description</label>
        			</div>
        			<button className="btn-flat blue white-text" type="submit" onClick={this.addLeaveType}>
        				Add Leave Type
        			</button>
              <button className="btn-flat blue white-text" type="submit" onClick={this.getLeaveTypes}>
        				Get Leave Types
        			</button>
        		</div>
        	</form>
        </div>
        <div id="editholiday" className="modal holiday-form">
        	<form action="javascript:void(0);">
        		<div className="modal-content">
        			<h5>Edit Leave type</h5>
        			<div className="input-field">
        				<input type="text" name="editleaveType" id="editleaveType" />
        				<label htmlFor="editleaveType">Leave Type</label>
        			</div>
        			<div className="input-field">
        				<textarea id="textarea2" className="materialize-textarea"></textarea>
        				<label htmlFor="textarea2">Description</label>
        			</div>
        			<button className="btn-flat blue white-text" type="submit">
        				Update Leave Type
        			</button>
        		</div>
        	</form>
        </div>
    </div>
    );
  }}

LeaveTypes.propTypes = {
  leave_types: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps){
  console.log(state)
  return {
      leave_types: state.leave_types
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(LeaveTypeActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(LeaveTypes);
