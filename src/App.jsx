import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import EventCreationForm from './EventCreationForm.jsx';
// import InsertForm from './InsertForm.js'
import { Timeline } from 'react-chartkick';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      eventCreation: {
        selected: {name: "", id: NaN},
        newTask: "",
        newDescription: "",
        newStartTime: "",
        newEndTime: ""
      },
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
        {id: 1, user_id: 1, name: 'buy beer', description: 'go to LBCO',assigned_start_time: '2017-03-01',assigned_end_time: '2017-03-02'},
        {id: 2, user_id: 1, name: 'buy cups', description: 'go to dollar store',assigned_start_time: '2017-03-02',assigned_end_time: '2017-03-03'},
        {id: 3, user_id: 2, name: 'bring music', description: 'check out spotify',assigned_start_time: '2017-03-01',assigned_end_time: '2017-03-02'},
        {id: 4, user_id: 3, name: 'wash car', description: 'clean my car yo',assigned_start_time: '2017-03-01',assigned_end_time: '2017-03-04'}
      ]
    };
    this.toggle = this.toggle.bind(this);
    this.newStartTime = this.newStartTime.bind(this)
    this.newEndTime = this.newEndTime.bind(this)
    this.newTask = this.newTask.bind(this);
    this.newDescription = this.newDescription.bind(this);
  }

  componentDidMount() {
    // console.log("componentDidMount <App />");
    const mysocket = new WebSocket("ws://localhost:3001");
    this.socket = mysocket;
  }
  newTask(event){
    console.log(event.target.value);
    let newTask = Object.assign({},this.state.eventCreation);
    newTask.newTask = event.target.value;
    this.setState({eventCreation: newTask});
  }
  newDescription(event){
    console.log(event.target.value);
    let newDescription = Object.assign({},this.state.eventCreation);
    newDescription.newDesciption = event.target.value;
    this.setState({newDescription: newDescription});
  }
  newStartTime(event){
    console.log(event.target.value);
    let newST = Object.assign({},this.state.eventCreation);
    newST.newStartTime = event.target.value;
    this.setState({newStartTime: newST});
  }
  newEndTime(event){
    console.log(event.target.value);
    let newET = Object.assign({},this.state.eventCreation);
    newET.newEndTime = event.target.value;
    this.setState({newEndTime: newET});
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

  addTask = () => {
    console.log(this.state); 
  }

  toggle(e) {
    if (e.target.className === "collection-item active"){
      e.target.className = "collection-item";
    } else {
      e.target.className="collection-item active";
    }
    let newSelected = Object.assign({},this.state.eventCreation);
    newSelected.selected.name = e.target.innerHTML;
    newSelected.selected.id = e.target.getAttribute('data-id');
    this.setState({
      eventCreation: newSelected
    }); 
  } 
  render() {

    return (
      <div className="App">
        <h1> Micromanage your next event</h1>
        {/*<InsertForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} />*/}
        <div className="event-wrapper">
          <div className="event-creation-form">
            <EventCreationForm {...this.state} 
              toggle={this.toggle} 
              assigned_people={this.state.assigned_people} 
              tasks={this.state.tasks} 
              eventCreation={this.state.eventCreation}
              addTask={this.addTask} 
              newTask={this.newTask}
              newDescription={this.newDescription}
              newStartTime={this.newStartTime}
              newEndTime={this.newEndTime}
              />
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
