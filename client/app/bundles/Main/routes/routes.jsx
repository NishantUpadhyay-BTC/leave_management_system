import React from 'react';
import { Route } from 'react-router';

import Holidays from '../components/Holidays'
import Dashboard from '../components/Dashboard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import App from '../components/App'
export default (
    <Route path="/" component={App}>
      <Route path="dashboard" component={Dashboard} />
      <Route path="holidays" component={Holidays} />
    </Route>
);
