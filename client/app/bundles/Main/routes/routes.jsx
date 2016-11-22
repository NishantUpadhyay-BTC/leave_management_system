import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Holidays from '../components/Holidays'
import Dashboard from '../components/Dashboard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LeaveTypes from '../components/LeaveTypes';
import App from '../components/App';
import LeaveRequest from '../components/LeaveRequest'
export default (
    <Route path="/" component={App}>
      <IndexRoute component={ Dashboard } />
      <Route path="dashboard" component={Dashboard} />
      <Route path="holidays" component={Holidays} />
      <Route path="leave_types" component={LeaveTypes} />
      <Route path="request_leave" component={LeaveRequest} />
    </Route>
);
