import React, { PropTypes } from 'react';
import UserDetails from './UserDetails';
import UserDetailsEditForm from './UserDetailsEditForm';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import * as ProfileActions from './../actions/ProfileActions';
import { browserHistory } from 'react-router';


class Profile extends React.Component {
  constructor(props, context){
    super(props, context);
  }

  componentWillMount(){
    this.props.actions.fetchProfile(localStorage.getItem('user_id'))
  }

  render(){
    let content;
    if(this.props.profile.profile != undefined){
      content = (<UserDetails data={this.props.profile.profile} />)
    }else{
      content = (<p> Please Wait </p> );
    }

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
                  { content }
      				</div>
      			</div>
      	</div>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  authUser: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps){
  return {
      profile: state.profile_reducer,
      authUser: state.auth_reducer
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(ProfileActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
