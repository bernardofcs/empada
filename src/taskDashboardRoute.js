import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const TaskDashboardRouter = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/project/:project_id/user/:user_id">Topics</Link></li>
      </ul>

      <hr/>

      <Route path="/project/:project_id/user/:user_id" component={TaskDashboard}/>
    </div>
  </Router>
)

const TaskDashboard = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

export default TaskDashboardRouter