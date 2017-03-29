import React, { Component } from 'react';
import '../styles/App.css';
import TaskDashboard from './TaskDashboard.js'
// import logo from './logo.svg';
import { Button, Modal } from 'react-materialize';
import ProgressBar from './ProgressBar.js';
// import { Timeline } from 'react-chartkick';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list_of_tasks : [
        {
          start_time: Date.now(),
          assigned_start_time: new Date().toLocaleTimeString(),
          description: 'description',
          assigned_end_time: new Date().toLocaleTimeString(),
          end_time: Date.now(),
          id: 1,
          user_id: 1
        },
        {
          start_time: Date.now(),
          assigned_start_time: new Date().toLocaleTimeString(),
          description: 'another description',
          assigned_end_time: new Date().toLocaleTimeString(),
          end_time: Date.now(),
          id: 2,
          user_id: 1
        },
        {
          start_time: Date.now(),
          assigned_start_time: new Date().toLocaleTimeString(),
          description: 'a third description',
          assigned_end_time: new Date().toLocaleTimeString(),
          end_time: Date.now(),
          id: 3,
          user_id: 2
        }
      ],
      progress_bar : [
        { 
          user_id: 1,
          incomplete_tasks: 100,
          completed_tasks: 0,
          total_tasks: undefined,
        },
        {
          user_id: 2,
          incomplete_tasks: 100,
          completed_tasks: 0,
          total_tasks: undefined,
        }
      ],
    }
  }

  updateCompletedAndIncompleteTasks = (e) => {
    e.preventDefault();

    const task = this.state.list_of_tasks.filter((t) => {
      return t.id === Number(e.target.value);
    })

    const userId = task[0].user_id
    let userProgressArr = this.state.progress_bar.filter((t) => {
      return t.user_id === userId;
    })

    const userTasks = this.state.list_of_tasks.filter((t) => {
      return t.user_id === userId;
    })

    let userProgress = userProgressArr[0];
    userProgress.total_tasks = userTasks.length;
    let percentOfTasksToChange = Math.round(100/userProgress.total_tasks);
    userProgress.completed_tasks += percentOfTasksToChange;
    userProgress.incomplete_tasks -= percentOfTasksToChange;
    const oldProgressBar = this.state.progress_bar;

    let newProgressBar = oldProgressBar.filter((t) => {
      return t.user_id !== userId
    })
    
    newProgressBar.push(userProgress);

    e.target.className += " disabled";

    let message = {
      type: 'end-time-for-contractor-tasks-and-updating-progress-bar', 
      progress_bar: newProgressBar,
      end_time: Date.now(),
      project_id: 12,
      id: 2,
    }
    console.log('start task button pressed');
    this.socket.send(JSON.stringify(message));
  }

  handleStartTask = (e) => {
    e.preventDefault();
    
    e.target.className += " disabled";
    
    let message = {
      type: 'start-time-for-contractor-tasks', 
      start_time: Date.now(),
      project_id: 12,
      id: 2
    }
    console.log('start task button pressed');
    this.socket.send(JSON.stringify(message));
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");

    this.socket.onopen = () => {
      console.log('Connected to server!')
    }

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);

      switch (data.type) {
        case 'update-progress-bar':
          let newstate = this.state;
          newstate.progress_bar = data.progress_bar
          this.setState(newstate);
        break;

        default:
          console.error('Failed to send back');
      }
      console.log()
    }
  }

  componentDidUpdate() {
    this.socket.onmessage = (event) => {
      console.log('entered did update');
      const data = JSON.parse(event.data);
      console.log(data);

      switch (data.type) {
        case 'update-progress-bar':
          let newstate = this.state;
          newstate.progress_bar = data.progress_bar
          this.setState(newstate);
        break;

        default:
          console.error('Failed to send back');
      }
    }
  }  

  render() {
    return (
      <div className="App">
        <div className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          <h2>Welcome to EMPADA</h2>
        </div>
        <br />
        {/*<div className='timeline-container'>
          <div className='timeline'>
            <Timeline data={sample_data} library={libraryData} stacked={true} />
          </div>
        </div>*/}
        {/*<div className='timeline-container'>
          <div className='timeline'>
            <BarChart 
            data={this.state.data}
            max={100}
            stacked={true}
          />
          </div>
        </div>*/}
        <Modal
          header='Modal Header'
          trigger={
            <Button waves='light'>MODAL</Button>
          }>
          <TaskDashboard 
            handleStartTask={this.handleStartTask}
            listOfTasks={this.state.list_of_tasks}
            updateCompletedAndIncompleteTasks={this.updateCompletedAndIncompleteTasks}
          />
          <ProgressBar 
            taskName={this.state.name}
            completedTasks={this.state.completed_tasks}
            incompleteTasks={this.state.incomplete_tasks}
            progressBar={this.state.progress_bar}
          />
        </Modal>
      </div>
    );
  }
}

export default App;
