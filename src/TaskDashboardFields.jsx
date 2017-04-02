import React, { Component } from 'react';
import { Button } from 'react-materialize';
import '../styles/App.css'

function timeInHours(date) {
  let t = new Date(date);
  let hours = t.getUTCHours(); 
  let AMHours = t.getUTCHours();
  let PMHours = t.getUTCHours()-12;
  let minutes = t.getUTCMinutes();

  if (hours > 12) {
    return minutes < 10 ? `${PMHours}:0${minutes} PM` : `${PMHours}:${minutes} PM`;
  } else {
    return minutes < 10 ? `${AMHours}:0${minutes} AM` : `${AMHours}:${minutes} AM`;
  }
}

class TaskDashboardFields extends Component {
  render() {
    return (
      <tr>
        <td>
          <Button 
            waves='light' 
            value={this.props.task.id}
            onClick={this.props.handleStartTask}>
            Begin Task
          </Button>
        </td>
        <td>
          <p>{timeInHours(this.props.task.assigned_start_time)}</p>
        </td>
        <td>
          <p>{this.props.task.description}</p>
        </td>
        <td>
          <p>{timeInHours(this.props.task.assigned_end_time)}</p>
        </td>
        <td>
          <Button 
            waves='light'
            value={this.props.task.userId}
            onClick={this.props.updateCompletedAndIncompleteTasks}>
            End Task
          </Button>
        </td>
      </tr>
    );
  }
}

export default TaskDashboardFields;
