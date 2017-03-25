import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import EventCreationForm from './EventCreationForm.jsx';
import InsertForm from './InsertForm.js'
import { Timeline } from 'react-chartkick';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount() {
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

    let data = [
      ["Washington", new Date(2017, 3, 25, 17, 0), new Date(2017, 3, 25, 17, 30)],
      ["Washington", new Date(2017, 3, 25, 8, 0), new Date(2017, 3, 25, 10, 0)],
      ["Adams", new Date(2017, 3, 25, 1, 0), new Date(2017, 3, 25, 3, 0)]
    ];

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to EMPADA</h2>
        </div>
        <br />
        <InsertForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
        <div className='timeline'>
          <Timeline data={data} />
        </div>
      </div>
    );
  }
}

export default App;
