import React, { PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import Header from './Header';
import { connect } from 'react-redux'
import * as LeaveActions from './../actions/LeaveActions';


class LeaveDetails extends React.Component {

  constructor(props, context){
    super(props, context);
    this.approveRequest = this.approveRequest.bind(this);
    this.requestStatus = this.requestStatus.bind(this);
  }

  componentWillMount(){
    console.log(this.props.params.leave_id)
    this.props.actions.fetchLeaveDetails(this.props.params.leave_id);
  }

  requestStatus(e){
      e.preventDefault();
      return $.ajax({
        url: "/sign_offs",
        dataType: 'json',
        method: "get",
        data: {access_token: '17c60fdf5981794bb31f246849ae398e'},
      success: function(data){
        console.log(data)
      }.bind(this)
    });
  }
  approveRequest(e){
      e.preventDefault();
      return $.ajax({
        url: "/sign_offs/16/change_status",
        dataType: 'json',
        method: "post",
        data: { sign_off: { status: 'approved' } },
      success: function(data){
        console.log(data)
        toastr.success('Woohooo!! Request Send Successfully!');
      }.bind(this)
    });
  }

  render(){
    let leave_details = this.props.active_request ;
    return(
      <div className="content">
      	<div className="container">
      			<div className="whitebg z-depth-2">
      				<div className="leave-request row">
      					<div className="col m4 employe-detail">
      						<div className="image">

      						</div>
      						<div className="info">
      							<h4>{leave_details.user_name}</h4>
      							<div className="designation">{leave_details.designation}</div>
      							<div className="red-text">On Probation</div>
      						</div>
      						<div className="leave-counter">
      							<ul>
      								<li>Leave Balance : 15</li>
      								<li>From Date : <b>{leave_details.date_from}</b></li>
                      <li>To Date : <b>{leave_details.date_to}</b></li>
      								<li>Leave Days : {leave_details.leave_days} days</li>
      								<li>Leave Type : <span className="green-text">{leave_details.leave_type}</span></li>
      							</ul>
      						</div>
      					</div>
      					<div className="col m8">
      						<h5>{leave_details.reason} <span className="right">Status: <span className="red-text">{leave_details.leave_status}</span></span></h5>
      						<p>{leave_details.description}</p>
      					</div>
      				</div>
      				<div className="chat-system">
      					<h4>Chat Convertation</h4>
      					<div className="chat-room">
      						<div className="time"><span>Yesterday</span></div>
      						<div className="chat-box">
      							<div className="chat-time">11:00 PM</div>
      							<div className="image z-depth-1"></div>
      							<div className="chat-text z-depth-1">
      								<div className="name">HR Manager</div>
      								Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
      								Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
      								Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
      							</div>
      						</div>
      						<div className="chat-box">
      							<div className="chat-time">11:03 PM</div>
      							<div className="image z-depth-1"></div>
      							<div className="chat-text z-depth-1">
      								<div className="name">Amit Patel</div>
      								Lorem ipsum
      							</div>
      						</div>
      						<div className="chat-box you">
      							<div className="chat-time">11:06 PM</div>
      							<div className="chat-text z-depth-1">
      								Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
      							</div>
      						</div>
      						<div className="time"><span>Today</span></div>
      						<div className="chat-box">
      							<div className="chat-time">Just Now</div>
      							<div className="image z-depth-1"></div>
      							<div className="chat-text z-depth-1">
      								Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
      							</div>
      						</div>
      						<div className="chat-box you">
      							<div className="chat-time">Just Now</div>
      							<div className="chat-text z-depth-1">
      								Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
      							</div>
      						</div>
      					</div>
      					<div className="chat-typing">
      						<div className="buttons">
      							<button onClick={this.requestStatus} className="btn-floating tooltipped blue waves-effect waves-light" data-position="top" data-delay="50" data-tooltip="Send Massege" name="">
      								<span className="fa fa-send"></span>
      							</button>
      							<button onClick={this.approveRequest} className="btn-floating tooltipped green waves-effect waves-light white-text" data-position="top" data-delay="50" data-tooltip="Approve Leave" name="" >
      								<span className="fa fa-check"></span>
      							</button>
      							<button onClick={this.approveRequest} className="btn-floating tooltipped red waves-effect waves-light white-text" name="" data-position="top" data-delay="50" data-tooltip="Reject Request Leave">
      								<span className="fa fa-close"></span>
      							</button>
      						</div>
      						<div className="input-field">
      		          <textarea id="textarea1" className="materialize-textarea" rows="1" placeholder="Type a message here"></textarea>
      		        </div>
      					</div>
      				</div>
      			</div>
      	</div>
      </div>
    );
  }
}

LeaveDetails.propTypes = {
  active_request: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps){
  console.log(state.active_request)
  return {
      active_request: state.active_request
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(LeaveActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(LeaveDetails);
