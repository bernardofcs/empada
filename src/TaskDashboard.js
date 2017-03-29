import React, { Component } from 'react';
import { Row, Table, Collection } from 'react-materialize';
import TaskDashboardFields from './TaskDashboardFields.jsx'
import '../styles/App.css'

class TaskDashboard extends Component {
  render() {
    return (
      <Row>
        <Collection header="List of Tasks">
        </Collection>

        <Table>

          <thead>
            <tr>
              <th data-field="Start Task">Start Task</th>
              <th data-field="Start Time">Start Time</th>
              <th data-field="Description">Description</th>
              <th data-field="End Time">End Time</th>
              <th data-field="End Task">End Task</th>
            </tr>
          </thead>

          <tbody>
            {
              this.props.listOfTasks.map((task, i) => {
                return <TaskDashboardFields
                  task={task}
                  handleStartTask={this.props.handleStartTask}
                  updateCompletedAndIncompleteTasks={this.props.updateCompletedAndIncompleteTasks}
                  key={i}
                />
              })
            }
          </tbody>

        </Table>
      </Row>
    );
  }
}

export default TaskDashboard;
