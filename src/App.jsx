import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import InsertForm from './InsertForm.js'
import { Timeline } from 'react-chartkick';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      tasks: [],
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

      const tasks = [];
      const timing = ['early start', 'late start', 'as scheduled', 'completed early', 'completed late'];
      for (let key of Object.keys(data.data)) {
        const task = data.data[key];
        // console.log(`creating task bars: ${task.task_name}`);

        if (task.start_date < task.assigned_start_date
          && task.end_date < task.assigned_end_date
          && task.assigned_start_date < task.end_date) {
          tasks.push([
            task.task_name,
            task.start_date,
            task.assigned_start_date,
            timing[0]
          ],
          [
            task.task_name,
            task.assigned_start_date,
            task.end_date,
            timing[2]

          ],
          [
            task.task_name,
            task.end_date,
            task.assigned_end_date,
            timing[3]
          ])
        } else if (task.start_date < task.assigned_start_date
          && task.end_date > task.assigned_end_date) {
          tasks.push([
            task.task_name,
            task.start_date,
            task.assigned_start_date,
            timing[0]
          ],
          [
            task.task_name,
            task.assigned_start_date,
            task.assigned_end_date,
            timing[2]
          ],
          [
            task.task_name,
            task.assigned_end_date,
            task.end_date,
            timing[4]
          ])
        } else if (task.start_date > task.assigned_start_date
          && task.end_date < task.assigned_end_date) {
          tasks.push([
            task.task_name,
            task.assigned_start_date,
            task.start_date,
            timing[1]
          ],
          [
            task.task_name,
            task.start_date,
            task.end_date,
            timing[2]
          ],
          [
            task.task_name,
            task.end_date,
            task.assigned_end_date,
            timing[3]
          ])
        } else if (task.start_date > task.assigned_start_date
          && task.end_date > task.assigned_end_date
          && task.start_date < task.assigned_end_date) {
          tasks.push([
            task.task_name,
            task.assigned_start_date,
            task.start_date,
            timing[1]
          ],
          [
            task.task_name,
            task.start_date,
            task.assigned_end_date,
            timing[2]
          ],
          [
            task.task_name,
            task.assigned_end_date,
            task.end_date,
            timing[4]
          ])
        } else if (task.end_date < task.assigned_start_date) {
          tasks.push([
            task.task_name,
            task.start_date,
            task.end_date,
            timing[3]
          ],
          [
            task.task_name,
            task.assigned_start_date,
            task.assigned_end_date,
            timing[3]
          ])
        } else if (task.start_date > task.assigned_end_date) {
          tasks.push([
            task.task_name,
            task.start_date,
            task.end_date,
            timing[1]
          ],
          [
            task.task_name,
            task.assigned_start_date,
            task.assigned_end_date,
            timing[1]
          ])
        }
      };

      const colorMap = {
        // should contain a map of category -> color for every category
        'early start'     : '#139A43',
        'late start'      : '#F26430',
        'as scheduled'    : '#279AF1',
        'completed early' : '#139A43',
        'completed late'  : '#F26430'
      };
      tasks.map((arr) => {
        arr.push(colorMap[arr[3]]);
        arr[3] = `${arr[0]} - ${arr[3]}`;
      });

      if (data.type === 'tasks') {
        this.setState({'tasks': tasks});
      };
    };
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
    const timing = ['early start', 'late start', 'as scheduled', 'completed early', 'completed late'];
    let sample_data = [
      ["Ammar", new Date(2016, 11, 1, 8,  1), new Date(2016, 11, 1, 8, 30), timing[0], '#a23c7a'],
      ["Ammar", new Date(2016, 11, 1, 8, 30), new Date(2016, 11, 1, 9,  1), timing[2], '#40a67d'],
      ["Ammar", new Date(2016, 11, 1, 9,  1), new Date(2016, 11, 1, 9, 30), timing[3], '#5581b4']
    ];
    let libraryData = {timeline: {groupByRowLabel: true}};

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to EMPADA</h2>
        </div>
        <br />
        {/*<InsertForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} />*/}
        <div className='timeline-container'>
          <div className='timeline'>
            <Timeline data={sample_data} library={libraryData} />
            <Timeline data={this.state.tasks} library={libraryData} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
