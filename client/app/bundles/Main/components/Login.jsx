import React, { PropTypes } from 'react';

export default class Login extends React.Component {
  constructor() {
    super()
    this.onLogin = this.onLogin.bind(this)
  }

  onLogin(e){
      e.preventDefault();
      let email = $(this.refs.user_email).val();
      let password = $(this.refs.user_password).val();
      return $.ajax({
        url: "/users/sign_in",
        dataType: 'json',
        method: "post",
        data: { user: {
          email: email,
          password: password
        }
      },
      success: function(data){
        console.log(data)
        this.setState({profile: { email: data.email, id: data.id }});
        toastr.success('Woohooo!! Login Successfully!');
        toastr.success('Welcome' + this.state.profile.email);
      }.bind(this)
    });
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
