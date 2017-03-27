import React, { Component } from 'react';
import '../styles/App.css';
import TaskDashboard from './TaskDashboard.js'
// import logo from './logo.svg';
import { Input } from 'react-materialize';
import ProgressBar from './ProgressBar.js';
import { Timeline } from 'react-chartkick';

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
          end_date: Date.now(),
          id: 1
        },
        {
          start_time: Date.now(),
          assigned_start_time: new Date().toLocaleTimeString(),
          description: 'another description',
          assigned_end_time: new Date().toLocaleTimeString(),
          end_date: Date.now(),
          id: 2
        },
        {
          start_time: Date.now(),
          assigned_start_time: new Date().toLocaleTimeString(),
          description: 'a third description',
          assigned_end_time: new Date().toLocaleTimeString(),
          end_date: Date.now(),
          id: 3
        }
      ],
      assigned_people: [
        {
          user_id: 1,
          task_id: 1, 
        },
        {
          user_id: 1,
          task_id: 2, 
        },
        {
          user_id: 2,
          task_id: 3
        }
      ],
      progress_bar : [
        { 
          user_id: 1,
          incomplete_tasks: 100, 
          completed_tasks: 0
        },
        {
          user_id: 2,
          incomplete_tasks: 100, 
          completed_tasks: 0
        }
      ]
    }
  }

    
    // if (progressBar.)
    // let chartArrayValues = progressBar.map((chartArray) => {
    //   return chartArray.length 
    // })

    // progressBar.map((chartArray) => {
    //   if (chartArray.user_id === e.target.id) {
    //     chartArray.completed_tasks
    //   }
    // })
  updateCompletedAndIncompleteTasks = (e) => {
    e.preventDefault();

    let progressBars = this.state.progress_bar.map((id) => {
      return (this.state.assigned_people.filter((t) =>
        t.user_id === id.user_id))
    })

    let progressBarCurrentLength = progressBars.forEach((el, i) => {
      el.forEach((elm) => {
        if (Number(elm.user_id) === Number(e.target.value)) {
          console.log(el.length)
        }
      })
    })

    this.state.progress_bar.forEach((i) => {
      if (Number(i.user_id) === Number(e.target.value)) {
        console.log(progressBarCurrentLength)
      }
    })
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

  // handleAddContractorToProgressBar = (e) => {
  //   e.preventDefault(); 

  //   let message = {
  //     type: 'add-contractor-to-progress-bar',
  //     name: this.state.name,
  //     completed_tasks: this.state.completed_tasks,
  //     incomplete_tasks: this.state.incomplete_tasks
  //   }
  //   console.log('contractor added to progress bar');
  //   this.socket.send(JSON.stringify(message));
  // }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");

    this.socket.onopen = () => {
      console.log('Connected to server!')
    }

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);

      switch (data.type) {
        // case 'add-contractor-to-progress-bar':
        //   this.concat.setState({
        //     name: this.state.name,
        //     completed_tasks: this.state.completed_tasks,
        //     incomplete_tasks: this.state.incomplete_tasks
        //   })
        // break;

        default:
          console.error('Failed to send back');
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
          updateCompletedAndIncompleteTasks={this.updateCompletedAndIncompleteTasks}
        />
        <div className='timeline-container'>
          <div className='timeline'>
            <Timeline data={sample_data} library={libraryData} stacked={true} />
          </div>
        </div>
        <Input
          placeholder="Create a new contractor"
          label="Create a new contractor"
          onSubmit={this.handleAddContractorToProgressBar}
        />
        <ProgressBar 
          taskName={this.state.name}
          completedTasks={this.state.completed_tasks}
          incompleteTasks={this.state.incomplete_tasks}
          progressBar={this.state.progress_bar}
        />
      </div>
    );
  }
}

export default App;
