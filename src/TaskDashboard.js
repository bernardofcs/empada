import React, { Component } from 'react';
import { Row, Button } from 'react-materialize';
import '../styles/App.css'
// only keep what you want to use 
// use radio button separately in each form, can't press the end button until the first button has been clicked

// apply the below once I want to add/remove classes
/*magic: function() {
  var myClass = this.state.cartClasses;

  if (condition) {
    this.setState({ cartClasses: 'class1' });
  } else {
    this.setState({ cartClasses: 'class2' });
  }  

  return (
    <div className={myClass}>
      hello world
    </div>
  );
}*/

class TaskDashboard extends Component {
  render() {
    return (
      <Row>
        <header>List of Tasks</header>

        <div>
          <Button waves='light' onClick={this.props.handleStartTask}>Begin Task</Button>
          <p>'tasks.assigned_start_time'</p>
          <p>'tasks.description'</p>
          <p>'tasks.assigned_end_time'</p>
        </div>

        <div>
          <Button waves='light' onClick={this.props.handleEndTask}>End Task</Button>
        </div>
      </Row>
    );
  }
}

export default TaskDashboard;

// <component /> do a fetch call with react router api
