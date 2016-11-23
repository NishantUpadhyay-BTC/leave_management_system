import React, { PropTypes } from 'react';
export default class LeaveRequest extends React.Component {
  componentDidMount(){
    $('select').material_select();
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
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
      		          <input id="first_name" type="text" className="validate" />
      		          <label htmlFor="first_name">Send to</label>
      		        </div>
      		        <div className="input-field col s6">
      		          <input id="last_name" type="text" className="validate" />
      		          <label htmlFor="last_name">Leave Resion</label>
      		        </div>
      		      </div>
      		      <div className="row">
      		        <div className="input-field col s6">
      		          <select>
      					      <option value="" disabled selected="selected">Choose your option</option>
      					      <option value="6">Project Manager</option>
      					      <option value="1">Sr. Developer</option>
      					      <option value="2">Traini</option>
      					      <option value="3">Sr. UI Developer</option>
      					      <option value="4">Jr. UI Developer</option>
      					      <option value="5">Sr. Teaster</option>
      					      <option value="5">Jr. Teaster</option>
      					    </select>
      					    <label>Leave Type</label>
      		        </div>
      		        <div className="input-field col s6">
      		          <input id="joiningDate" type="date" className="datepicker" placeholder="Select Date" />
      		          <label className="active">Leave From</label>
      		        </div>
      		        <div className="input-field col s6">
      		          <select>
      					      <option value="" disabled selected="selected">Choose your option</option>
      					      <option value="4">Full Day</option>
      					      <option value="5">Half Day</option>
      					      <option value="5">Multiple Day</option>
      					    </select>
      					    <label>Leave Time type</label>
      		        </div>
      		        <div className="input-field col s6">
      		          <input id="leaveTo" type="date" className="datepicker" placeholder="Select Date" />
      		          <label className="active">Leave End</label>
      		        </div>
      		      </div>
      	        <div className="input-field">
      	          <textarea id="textarea1" className="materialize-textarea"></textarea>
      	          <label htmlFor="textarea1">Description</label>
      	        </div>
      	        <button type="submit" className="btn blue">Send Leave Request <span className="fa fa-send"></span></button>
      	        <a href="#" className="btn grey lighten-1">Cancel</a>
      		    </form>
      			</div>
      	</div>
      </div>
    );
  }
}
