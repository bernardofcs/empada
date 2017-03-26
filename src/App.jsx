import React, { Component } from 'react';
// import logo from './logo.svg';
import '../styles/App.css';
import InsertForm from './InsertForm.js'
import TaskDashboard from './TaskDashboard.js'
// import { BrowserRouter, Route, Link } from 'react-router-dom'

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
        }
      ]
    };
  }

  handleStartTask = (e) => {
    e.preventDefault();
    
    e.target.className += " disabled"
    
    let message = {
      type: 'start-time-for-contractor-tasks', 
      start_time: this.state.start_time,
      project_id: 12,
      id: 2
    }
    console.log('it is activating the button')
    this.socket.send(JSON.stringify(message));
  }

  handleEndTask = (e) => {
    e.preventDefault(); 

    e.target.className += " disabled"    

    let message = {
      type: 'end-time-for-contractor-tasks', 
      end_date: this.state.end_date,
      project_id: 12,
      id: 3
    }
    console.log('it is activating the button')
    this.socket.send(JSON.stringify(message));
  }

  componentDidMount = () => {
    // console.log("componentDidMount <App />");
    const mysocket = new WebSocket("ws://localhost:3001")
    this.socket = mysocket;
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
    return (
      <div className="App">
        <div className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          <h2>Welcome to EMPADA</h2>
        </div>
        <br />
        <InsertForm 
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit} 
          />
        <TaskDashboard 
          handleStartTask={this.handleStartTask} 
          handleEndTask={this.handleEndTask}
          listOfTasks={this.state.list_of_tasks}
          />
      </div>
    );
  }
}

export default App;
