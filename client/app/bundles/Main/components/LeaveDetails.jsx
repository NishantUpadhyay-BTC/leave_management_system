import React, { PropTypes } from 'react';
export default class LeaveDetails extends React.Component {

  constructor(props, context){
    super(props, context);
    this.approveRequest = this.approveRequest.bind(this);
    this.requestStatus = this.requestStatus.bind(this);
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
        data: { status: 'approved' },
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
      			<div className="whitebg z-depth-2">
      				<div className="leave-request row">
      					<div className="col m4 employe-detail">
      						<div className="image">

      						</div>
      						<div className="info">
      							<h4>Nishant Upadhyay</h4>
      							<div className="designation">Sr. Developer</div>
      							<div className="red-text">On Probation</div>
      						</div>
      						<div className="leave-counter">
      							<ul>
      								<li>Leave Balance : 15</li>
      								<li>Team Lead : <b>Amit Patel</b></li>
      								<li>Date : <b>11<sup>th</sup> Jan</b> to <b>15<sup>th</sup> Jan</b></li>
      								<li>Leave Days : 5 days</li>
      								<li>Leave Type : <span className="green-text">Madical</span></li>
      							</ul>
      						</div>
      					</div>
      					<div className="col m8">
      						<h5>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. <span className="right">Status: <span className="red-text">Pending</span></span></h5>
      						<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.</p>
      						<p>Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.</p>
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
