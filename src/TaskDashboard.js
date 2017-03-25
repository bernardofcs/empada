import React, { Component } from 'react';
import { Row, Button, Input } from 'react-materialize';
import './App.css'
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
          {/*<div onClick={this.props.handleStartTask}>*/}
            <Button waves='light' onClick={this.props.handleStartTask}>button</Button>
          {/*</div>*/}
          <p>'tasks.assigned_start_time'</p>
          <p>'tasks.description'</p>
          <p>'tasks.assigned_end_time'</p>
        </div>

        <div>
          <form onSubmit={this.props.handleEndTask}>
            <Input name='group2' type='radio' value='brown' label='End Task' disabled='disabled' />
          </form>
        </div>
      </Row>
    );
  }
}

export default TaskDashboard;

// <component /> do a fetch call with react router api
