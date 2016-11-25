import React, { PropTypes } from 'react';
export default class LeaveRequest extends React.Component {
  constructor(props, context){
    super(props, context);
    this.sendSignOffRequest = this.sendSignOffRequest.bind(this);
  }
  componentDidMount(){
    $('select').material_select();
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
    });
  }

  sendSignOffRequest(e){
      e.preventDefault();
      return $.ajax({
        url: "/sign_offs",
        dataType: 'json',
        method: "post",
        data: { sign_off: {
          requestee_ids: "2,3,4",
          sign_off_type_id: '1',
          half_full_leave: "half",
          date_from: "26/11/2016",
          date_to: "1/12/2016",
          reason: 'This is the reason'
        },
        access_token: '17c60fdf5981794bb31f246849ae398e'
      },
      success: function(data){
        console.log(data)
        toastr.success('Woohooo!! Request Send Successfully!');
      }.bind(this)
    });
  }

  render(){
    return(
      <div className="content">
      	<div className="container">
      			<div className="whitebg z-depth-1">
      				<form className="form-box" action="javascript:void(0);">
      		      <div className="row">
      		        <div className="input-field col s6">
      		          <input id="requesting_to" type="text" className="validate"  ref="requesting_to"/>
      		          <label htmlFor="requesting_to">Send to</label>
      		        </div>
      		        <div className="input-field col s6">
      		          <input id="leave_reason" type="text" className="validate" ref="leave_reason"/>
      		          <label htmlFor="leave_reason">Leave Resion</label>
      		        </div>
      		      </div>
      		      <div className="row">
      		        <div className="input-field col s6">
      		          <select ref="leave_type">
      					      <option value="" disabled selected="selected">Choose your option</option>
      					      <option value="Sick Leave">Sick Leave</option>
      					      <option value="Casual Leave">Casual Leave</option>
      					      <option value="Emergency Leave">Emergency Leave</option>
      					      <option value="Paid Leave">Paid Leave</option>
      					    </select>
      					    <label>Leave Type</label>
      		        </div>
      		        <div className="input-field col s6">
      		          <input id="joiningDate" type="date" className="datepicker" placeholder="Leave From" ref="leave_from"/>
      		          <label className="active">Leave From</label>
      		        </div>
      		        <div className="input-field col s6">
      		          <select>
      					      <option value="" disabled selected="selected">Choose your option</option>
      					      <option value="full_day">Full Day</option>
      					      <option value="half_day">Half Day</option>
      					      <option value="multiple_day">Multiple Day</option>
      					    </select>
      					    <label>Leave Time type</label>
      		        </div>
      		        <div className="input-field col s6">
      		          <input id="leaveTo" type="date" className="datepicker" placeholder="Select Date" />
      		          <label className="active">Leave End</label>
      		        </div>
      		      </div>
      	        <div className="input-field">
      	          <textarea id="textarea1" className="materialize-textarea" ref="leave_reason"></textarea>
      	          <label htmlFor="textarea1">Leave Reason</label>
      	        </div>
      	        <button type="submit" className="btn blue" onClick={this.sendSignOffRequest}>Send Leave Request <span className="fa fa-send"></span></button>
      	        <a href="#" className="btn grey lighten-1">Cancel</a>
      		    </form>
      			</div>
      	</div>
      </div>
    );
  }
}
