import React, { PropTypes } from 'react';
import NotificationBox from './NotificationBox';

export default class Notifications extends React.Component {
  constructor(props, context) {
      super(props, context);
      this.prepare_notification = this.prepare_notification.bind(this);
  }

  prepare_notification(notification){
    return <NotificationBox key={notification.id} data = {notification} />
  }

  render(){
    let data = [
      {id: 1, name: 'Nisant Upadhyay ', subject: 'Requasted for Leave : Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor....', time: '11 AM Today'},
      {id: 2, name: 'Neeraj Khatri', subject: 'Casual leave for marriage', time: '11 AM Today'},
      {id: 3, name: 'John Doe', subject: 'Late Arrival - Due to Traffice Jam unable to come early', time: '10 AM Today'}
    ]
    return(
      <div className="content">
      	<div className="container">
      			<div className="whitebg z-depth-1">
      				<div className="notifications-list">
                { data.map(notification => this.prepare_notification(notification))}
      				</div>
      			</div>
      	</div>
      </div>
    );
  }
}
