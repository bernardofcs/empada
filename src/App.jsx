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
      assigned_people: [
        {
          name: 'Jimmy',
          id: 1
        },
        {
          name: 'Johnny',
          id: 2
        },
        {
          name: 'Sally',
          id: 3
        }
      ],
      tasks: [
        {id: 1, user_id: 1, name: 'buy beer', description: 'go to LBCO',assigned_start_time: new Date(2017,1,1,5,30),assigned_end_time: new Date(2017,1,1,5,30)},
        {id: 2, user_id: 1, name: 'buy cups', description: 'go to dollar store',assigned_start_time: new Date(2017,1,1,8,30),assigned_end_time: new Date(2017,1,1,10,30)},
        {id: 3, user_id: 2, name: 'bring music', description: 'check out spotify',assigned_start_time: new Date(2017,1,1,11,30),assigned_end_time: new Date(2017,1,1,14,30)},
        {id: 4, user_id: 3, name: 'wash car', description: 'clean my car yo',assigned_start_time: new Date(2017,1,1,10,30),assigned_end_time: new Date(2017,1,1,20,30)}
      ]
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
            <EventCreationForm assigned_people={this.state.assigned_people} tasks={this.state.tasks}/>
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
