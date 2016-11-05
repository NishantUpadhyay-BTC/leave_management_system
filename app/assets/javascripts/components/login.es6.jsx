class Login extends React.Component {
  render() {
    return (
      <div className="row" id="login-page">
        <div className="col s12 z-depth-4 card-panel">
          <form className="login-form">
            <div className="row">
              <div className="input-field col s12 center">
                <img
                  className="circle responsive-img valign profile-image-login"
                  alt=""
                  src="assets/logo.png"/>
                <p className="center login-form-text">
                  Smart SignOff
                </p>
              </div>
            </div>
            <div className="row margin">
              <div className="input-field col s12">
                <i className="fa fa-user-o fa-1x prefix">
                </i>
                <input type="text" id="username"/>
                <label htmlFor="username">Username</label>
              </div>
            </div>
            <div className="row margin">
              <div className="input-field col s12">
                <i className="fa fa-lock prefix">
                </i>
                <input type="password" id="password"/>
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12 m12 l12  login-text">
                <input type="checkbox" id="remember-me"/>
                <label htmlFor="remember-me">
                  Remember me
                </label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <a
                  className="btn waves-effect waves-light col s12"
                  href="index.html">Login</a>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s5 m5 l5">
                <p className="margin medium-small">
                  <a href="page-register.html">
                  </a>
                </p>
              </div>
              <div className="input-field col s7 m7 l7">
                <p className="margin right-align medium-small">
                  <a href="page-forgot-password.html">
                    Forgot password ?
                  </a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
