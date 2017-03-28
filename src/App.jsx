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
          user_id: 1,
          task_id: 3, 
        },
        {
          user_id: 1,
          task_id: 4, 
        },
        {
          user_id: 2,
          task_id: 5
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
          incomplete_tasks: 80, 
          completed_tasks: 20
        }
      ]
    }
  }

  // updateProgressBar = () => {
  //   // new_progressbars = 
  //   this.setState(progress_bar: new_progressbars)
  // }

  updateCompletedAndIncompleteTasks = (e) => {
    e.preventDefault();
    
    // grabs and matches the user_id from progress_bar and assigned_people
    let progressBars = this.state.progress_bar.map((id) => {
      return (this.state.assigned_people.filter((t) =>
        t.user_id === id.user_id))
    })

    let array = []; 
    
    // grabs the length of the user_id array chosen from earlier
    progressBars.forEach((el, i) => {
      el.forEach((elm) => {
        if (Number(elm.task_id) === Number(e.target.value)) {
          console.log(elm)
          array.push(el.length)
        }
      })
    })

    let pbLength = array.pop(); 

    let percentOfTasksToChange = 0;

    // creates the percentage amount to add adn remove from the completed and incomplete values
    this.state.progress_bar.forEach((elm) => {
      if (Number(elm.user_id) === Number(e.target.value)) {
        let amount = elm.incomplete_tasks/pbLength
        percentOfTasksToChange += amount; 
      }
    })

    // end state that I want to set for incomplete and completed tasks
    let completedTasksNewState = 0; 
    let incompleteTasksNewState = 0; 

    // need to implement the progressBars because it has access to the task_id
    this.state.progress_bar.forEach((elem) => {
      if (Number(elem.user_id) === Number(e.target.value)) {
        let completedChange = elem.completed_tasks + percentOfTasksToChange;
        completedTasksNewState += completedChange;

        let incompleteChange = elem.incomplete_tasks - percentOfTasksToChange;
        incompleteTasksNewState += incompleteChange; 
      }
    })

    // will probably have to create a new field, one that is initially set once a new bar is created, so that it will have a static value to check to see how long the initial state was, that way it is always reduced/increased by the same percentage

    console.log(completedTasksNewState);
    console.log(incompleteTasksNewState);

    e.target.className += " disabled";
    
    let message = {
      type: 'end-time-for-contractor-tasks-and-updating-progress-bar', 
      completed_tasks: completedTasksNewState,
      incomplete_tasks: incompleteTasksNewState,
      start_time: Date.now(),
      project_id: 12,
      id: 2
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
        case 'update-progress-bar':
          this.setState({
            completed_tasks: data.completed_tasks,
            incomplete_tasks: data.incomplete_tasks
          })
        break;

        default:
          console.error('Failed to send back');
      }
    }
  }

  componentDidUpdate() {
    this.socket.onmessage = (event) => {
      console.log('entered did update');
      const data = JSON.parse(event.data);
      console.log(data);

      switch (data.type) {
        case 'update-progress-bar':
          this.setState({
            completed_tasks: data.completed_tasks,
            incomplete_tasks: data.incomplete_tasks
          })
        break;

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
