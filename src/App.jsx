import React, { Component } from 'react';
import '../styles/App.css';
import TaskDashboard from './TaskDashboard.js'
// import logo from './logo.svg';
import ProgressBar from './ProgressBar.js';
import { Timeline } from 'react-chartkick';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      list_of_tasks : [
        {
          start_time: Date.now(),
          assigned_start_time: Date.now(),
          description: 'description',
          assigned_end_time: Date.now(),
          end_date: Date.now()
        },
        {
          start_time: Date.now(),
          assigned_start_time: Date.now(),
          description: 'another kickass description',
          assigned_end_time: Date.now(),
          end_date: Date.now()
        }
      ]
    };
  }

  handleStartTask = (e) => {
    e.preventDefault();
    
    e.target.className += " disabled";
    
    let message = {
      type: 'start-time-for-contractor-tasks', 
      type2: 'begin-task-button-disabled',
      start_time: Date.now(),
      project_id: 12,
      id: 2
    }
    console.log('start task button pressed');
    this.socket.send(JSON.stringify(message));
  }

  handleEndTask = (e) => {
    e.preventDefault(); 

    e.target.className += " disabled"

    let message = {
      type: 'end-time-for-contractor-tasks', 
      end_date: Date.now(),
      project_id: 12,
      id: 2
    }
    console.log('end task button pressed');
    this.socket.send(JSON.stringify(message));
  }

  componentDidMount() {
    // console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:3001");

    this.socket.onopen = () => {
      console.log('Connected to server!')
    }

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);

      const tasks = [];
      for (let key of Object.keys(data.data).slice(0,1)) {
        const task = data.data[key];

        if (task.start_date < task.assigned_start_date
          && task.end_date < task.assigned_end_date) {
          tasks.push([
            task.task_name,
            task.start_date,
            task.assigned_start_date,
          ],
          [
            task.task_name,
            task.assigned_start_date,
            task.end_date
          ],
          [
            task.task_name,
            task.end_date,
            task.assigned_end_date
          ])
        } else if (task.start_date < task.assigned_start_date
          && task.end_date > task.assigned_end_date) {
          tasks.push([
            task.task_name,
            task.start_date,
            task.assigned_start_date
          ],
          [
            task.task_name,
            task.assigned_start_date,
            task.assigned_end_date
          ],
          [
            task.task_name,
            task.assigned_end_date,
            task.end_date
          ])
        } else if (task.start_date > task.assigned_start_date
          && task.end_date < task.assigned_end_date) {
          tasks.push([
            task.task_name,
            task.assigned_start_date,
            task.start_date
          ],
          [
            task.task_name,
            task.start_date,
            task.end_date
          ],
          [
            task.task_name,
            task.end_date,
            task.assigned_end_date
          ])
        } else if (task.start_date > task.assigned_start_date
          && task.end_date > task.assigned_end_date) {
          tasks.push([
            task.task_name,
            task.assigned_start_date,
            task.start_date
          ],
          [
            task.task_name,
            task.start_date,
            task.assigned_end_date
          ],
          [
            task.task_name,
            task.assigned_end_date,
            task.end_date
          ])
        }
      };

      console.log(tasks);

      if (data.type === 'tasks') {
        this.setState({'tasks': tasks})
      }
    }
  }

  render() {
    let sample_data = [
      ["Washington",  new Date(1789,  4, 19),  new Date(1789,  9,  3)],
      ["Washington",  new Date(1789,  9,  3),  new Date(1790,  1,  3)],
      ["Washington",  new Date(1790,  1,  3),  new Date(1790,  3,  3)]
    ];
    console.log(sample_data)
    let libraryData = {};
    return (
      <div className="App">
        <div className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          <h2>Welcome to EMPADA</h2>
        </div>
        <br />
        <TaskDashboard 
          handleStartTask={this.handleStartTask}
          handleEndTask={this.handleEndTask}
          listOfTasks={this.state.list_of_tasks}
          />
        <div className='timeline-container'>
          <div className='timeline'>
            <Timeline data={sample_data} library={libraryData} stacked={true} />
          </div>
        </div>
        <ProgressBar />
      </div>
    );
  }
}

export default App;
