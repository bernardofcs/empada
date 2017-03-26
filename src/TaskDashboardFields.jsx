import React, { Component } from 'react';
import { Button } from 'react-materialize';
import '../styles/App.css'

class TaskDashboardFields extends Component {
  render() {
    return (
      <tr>
        <td>
          <Button waves='light' onClick={this.props.handleStartTask}>Begin Task</Button>
        </td>
        <td>
          <p>{this.props.task.assigned_start_time}</p>
        </td>
        <td>
          <p>{this.props.task.description}</p>
        </td>
        <td>
          <p>{this.props.task.assigned_end_time}</p>
        </td>
        <td>
          <Button waves='light' onClick={this.props.handleEndTask}>End Task</Button>
        </td>
      </tr>
    );
  }
}

export default TaskDashboardFields;
