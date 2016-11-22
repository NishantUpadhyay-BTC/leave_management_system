import React, { PropTypes } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class App extends React.Component {
  constructor(props, context){
    super(props, context);
    this.current_path = this.current_path.bind(this);
  }

  current_path() {
    let path = this.props.route.path;
    if(path == '/')
      return 'Dashboard';
    else if(path == 'holidays')
      return 'Manage Holidays';
    else if(path == 'leave_types')
      return 'Manage Leave Types';
    else if(path == 'request_leave')
      return 'Request a Leave';
    else if(path == 'notifications')
      return 'Notifications';
    else if(path == 'Profile')
      return 'Your Profile';
    else
      return 'Home';
  }

  render() {
    return (
      <div>
        <Header current_page={this.current_path()}/>
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
