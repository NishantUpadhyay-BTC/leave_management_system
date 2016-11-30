import React, { PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as authActions from './../../actions/authActions';
import { browserHistory } from 'react-router'

class Login extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.onLogin = this.onLogin.bind(this);
    this.transferToDashboardIfLoggedIn  = this.transferToDashboardIfLoggedIn.bind(this)
  }

  transferToDashboardIfLoggedIn(){
    if (this.props.authUser.isLoggedIn){
      browserHistory.push('/dashboard')
    }
  }
  componentWillMount() {
    this.transferToDashboardIfLoggedIn();
  }
  componentDidUpdate() {
    this.transferToDashboardIfLoggedIn();
  }

  onLogin(e){
      e.preventDefault();
      let email = $(this.refs.user_email).val();
      let password = $(this.refs.user_password).val();
      this.props.actions.doLogin(email, password)
  }

  render() {
    return(
      <div className="content row">
        <div className='col m2'></div>
        <div className="col m8">
      		<div className="container">
      			<div className="whitebg z-depth-1">
      				<h5 className="center-align">Login</h5>
      				<form action="javascript:void(0);">
      					<div className="input-field">
      						<input type="text" name="username" ref="user_email" />
      						<label>Username / Email </label>
      					</div>
      					<div className="input-field">
      						<input type="password" name="password" ref="user_password" />
      						<label>Password</label>
      					</div>
      					<div className="switch row">
      						<label>
      							<input type="checkbox" />
      							<span className="lever"></span>
      							Remember me
      						</label>
      					</div>
      					<div className="row">

      						<div className="col s6">
      							<button className="btn blue" onClick={this.onLogin}>
      								Login <span className="fa fa-sign-in"></span>
      							</button>
      						</div>
      						<div className="col s6">
      							<a className="btn-flat smallbtn">Forgot Password?</a>
      						</div>
      					</div>
      				</form>
      			</div>
      		</div>
        </div>
    	</div>
    );
  }
}

Login.propTypes = {
  authUser: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps){
  return {
      authUser: state.auth_reducer
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
