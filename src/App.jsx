import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import EventCreationForm from './EventCreationForm.jsx';
// import InsertForm from './InsertForm.js'
import { Timeline } from 'react-chartkick';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [
        ["Jimmy", new Date(2017, 3, 25, 17, 0), new Date(2017, 3, 25, 17, 30)],
        ["Johnny", new Date(2017, 3, 25, 8, 0), new Date(2017, 3, 25, 10, 0)],
        ["Sally", new Date(2017, 3, 25, 1, 0), new Date(2017, 3, 25, 3, 0)]
      ],
      assigned_people: ['Jimmy','Johnny','Sally'],
      tasks: ['eat food','sleep long time','smell flowers']
    };
  }

  componentDidMount() {
    // console.log("componentDidMount <App />");
    const mysocket = new WebSocket("ws://localhost:3001");
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
        <h1> Make your next event super organized </h1>
        {/*<InsertForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} />*/}
        <div className="event-wrapper">
          <div className="event-creation-form">
            <EventCreationForm assigned_people ={this.state.assigned_people} tasks={this.state.tasks}/>
          </div>
          <div className='timeline'>
            <Timeline data={this.state.data} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
