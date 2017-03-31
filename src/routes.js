import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App.jsx';
import EventCreationForm from './EventCreationForm';
import ProgressBar from './ProgressBar';
import TaskDashboard from './TaskDashboard';
import Home from './Home'

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
  <Route path="/" component={Home}> 
    <IndexRoute component={App} />
    <Route path="/EventCreation" component={EventCreationForm} />
    <Route path="/ProgressBar" component={ProgressBar} />
  </Route>
);