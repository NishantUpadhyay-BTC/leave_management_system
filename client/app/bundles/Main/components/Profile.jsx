import React, { PropTypes } from 'react';
import UserDetails from './UserDetails';
import UserDetailsEditForm from './UserDetailsEditForm';

export default class Profile extends React.Component {
  render(){
    return(
      <div className="content">
      	<div className="container">
      			<div className="whitebg z-depth-2">
      				<div className="row">
      					<div className="col m3">
      						<div className="user-profile clearfix">
      							<div className="image"></div>
      							<div className="user-info">
      								<div className="name">Nishant Upadhyay</div>
      								<div className="designation">Sr. Developer</div>
      							</div>
      						</div>
      						<div className="box indigo">
      							<strong>Leave Balance</strong>: 10
      						</div>
      						<div className="box blue">
      							<strong>Leave Requests</strong>: 1
      						</div>
      						<div className="box blue lighten-2">
      							<strong>Taken Leave</strong>: 5
      						</div>
      					</div>
      					<UserDetailsEditForm />
      				</div>
      			</div>
      	</div>
      </div>
    );
  }
}
