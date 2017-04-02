import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../styles/index.css';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom'
import EventCreationForm from './EventCreationForm.jsx';


const app = document.getElementById('root')

const Nav = () => (
  <div>
    <Link to='/'>Home</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <Link to='/createProject'>Create Project</Link>&nbsp;&nbsp;&nbsp;&nbsp;
    <Link to='/logout'>Logout</Link>
  </div>
)

// const Container = (props) => <div>
//   <Nav />
//   {props.children}
// </div>

ReactDOM.render( 
  <Router>
    <div> 
      <Route exact path='/' component={Nav} />
      <Route exact path='/' component={App} />
      <Route exact path='/createProject' component={() =>(<EventCreationForm 
          {...this.state}
          submitEvent={this.submitEvent}
          eventCreationSelectToggle={this.eventCreationSelectToggle} 
          addTask={this.addTask} 
          clearTaskFields={this.clearTaskFields}
          onNewTask={this.newTask}
          onNewDescription={this.newDescription}
          onNewStartTime={this.newStartTime}
          onNewEndTime={this.newEndTime}
          newEventStartDate={this.newEventStartDate}
          newEventEndDate={this.newEventEndDate}
          newEventDescription={this.newEventDescription}
          newEventName={this.newEventName}
          updateTimeline={this.updateTimeline}
          handleAssignedPerson={this.handleAssignedPerson}
          addNewAssignedUser={this.addNewAssignedUser}
          handleAssignedEmail={this.handleAssignedEmail} />)}/>
    </div>
  </Router>,
  app
);