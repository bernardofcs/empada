import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import InsertForm from './InsertForm.js'
import { Timeline } from 'react-chartkick';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      tasks: []
    };
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

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log('submitted')
   console.log(this.state.insert)
   this.socket.send(this.state.insert)
  }

  handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value)
    this.setState({insert: e.target.value})
  }

  render() {

    let sample_data = [
      ["Washington",  new Date(1789,  4, 19),  new Date(1789,  9,  3)],
      ["Washington",  new Date(1789,  9,  3),  new Date(1790,  1,  3)],
      ["Washington",       new Date(1790,  1,  3),  new Date(1790,  3,  3)]
    ];
    console.log(sample_data)
    // let libraryData = {timeline:{ singleColor: '#8d8' }};
    let libraryData = {};

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to EMPADA</h2>
        </div>
        <br />
        <InsertForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
        <div className='timeline-container'>
          <div className='timeline'>
            <Timeline data={sample_data} library={libraryData} stacked={true} />
            <Timeline data={this.state.tasks} library={libraryData} stacked={true} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
