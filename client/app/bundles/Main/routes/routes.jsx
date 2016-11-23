import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Holidays from '../components/Holidays'
import Dashboard from '../components/Dashboard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LeaveTypes from '../components/LeaveTypes';
import App from '../components/App';
import LeaveRequest from '../components/LeaveRequest';
import Notifications from '../components/Notifications';
import Profile from '../components/Profile';
import LeaveDetails from '../components/LeaveDetails';
import Login from '../components/Login';
export default (
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path= 'login' component={Login} />
      <Route path="dashboard" component={Dashboard} />
      <Route path="holidays" component={Holidays} />
      <Route path="leave_types" component={LeaveTypes} />
      <Route path="request_leave" component={LeaveRequest} />
      <Route path="notifications" component={Notifications} />
      <Route path="profile" component={Profile} />
      <Route path="leave_details/:leave_id" component={LeaveDetails} />
    </Route>
);
