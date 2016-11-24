import React, { PropTypes } from 'react';
import LeaveTypeBox from './LeaveTypeBox'

export default class LeaveTypes extends React.Component {
  constructor(props, context) {
      super(props, context);
      this.prepare_leave_types = this.prepare_leave_types.bind(this);
      this.addLeaveType = this.addLeaveType.bind(this);
      this.getLeaveTypes = this.getLeaveTypes.bind(this);
  }

  addLeaveType(e){
    e.preventDefault();
      return $.ajax({
        url: "/sign_off_types",
        dataType: 'json',
        method: "post",
        data: {access_token: '17c60fdf5981794bb31f246849ae398e', sign_off_type: { sign_off_type_name: "Medical Leave", no_of_days: 2, description: "This is for medical Emergency"}},
      success: function(data){
        console.log(data)
      }.bind(this)
    });
  }

  getLeaveTypes(e){
    e.preventDefault();
      return $.ajax({
        url: "/sign_off_types",
        dataType: 'json',
        method: "get",
        data: {access_token: '17c60fdf5981794bb31f246849ae398e'},
      success: function(data){
        console.log(data)
      }.bind(this)
    });
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
    let data = [
      {id: 1, type: 'Sick Leave', description: 'Leave taken due to sickness '},
      {id: 2, type: 'Casual Leave', description: 'Leave taken for some occasion'}
    ]
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
        					{ data.map(leave_type => this.prepare_leave_types(leave_type))}
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
        				<input type="text" name="leaveType" id="leaveType" />
        				<label htmlFor="leaveType">Leave Type</label>
        			</div>
        			<div className="input-field">
        				<textarea id="textarea1" className="materialize-textarea"></textarea>
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
