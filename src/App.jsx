import React, { Component } from 'react';
import './App.css';
import EventCreationForm from './EventCreationForm.jsx';
import { Timeline } from 'react-chartkick';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      eventCreation: {
        selected: {name: "", id: NaN},
        date: "",
        name: "",
        description: "",
        newTask: "",
        newDescription: "",
        newStartTime: "",
        newEndTime: "",
        newAssignedPerson: "",
        newAssignedEmail: "",
        assigned_people: [
        ],
        tasks: [],
        timelineData: []
      }
    };
  }
  addNewAssignedUser = (event) => {
    var newUser = Object.assign({},this.state.eventCreation)
    newUser.assigned_people.push({
      name: this.state.eventCreation.newAssignedPerson,
      id: this.state.eventCreation.assigned_people.length+1,
      email: this.state.eventCreation.newAssignedEmail
    })
    newUser.newAssignedEmail = '';
    newUser.newAssignedPerson = '';
    this.setState({eventCreation: newUser});
  }
  handleAssignedEmail = (event) => {
    let newEmail = Object.assign({},this.state.eventCreation);
    newEmail.newAssignedEmail = event.target.value;
    this.setState({eventCreation: newEmail});
  }
  handleAssignedPerson = (event) => {
    let newPerson = Object.assign({},this.state.eventCreation);
    newPerson.newAssignedPerson = event.target.value;
    this.setState({eventCreation: newPerson});
  }
  updateTimeline = () => {
    var timelineData = this.state.eventCreation.tasks.map( (t) => {
      // console.log([this.state.assigned_people.filter((p)=> p.id == t.user_id )[0].name, '2017-03-27T'+t.assigned_start_time+'.000Z', '2017-03-27T'+t.assigned_end_time+'.000Z' ]);
      return [this.state.eventCreation.assigned_people.filter((p)=> parseInt(p.id,10) === parseInt(t.user_id,10) )[0].name, '2017-03-27T'+t.assigned_start_time+'.000Z', '2017-03-27T'+t.assigned_end_time+'.000Z' ]
    });
    console.log(timelineData);
    var newTimelineData = Object.assign({},this.state.eventCreation)
    newTimelineData.timelineData = timelineData;
    this.setState({ eventCreation: newTimelineData });
  }
  addTask = () => {
    //add a new task to the task state, and add data to timeline.
    const t_values = this.state.eventCreation;
    var newTasks = Object.assign({},this.state.eventCreation)
    newTasks.tasks.push({
      id: this.state.eventCreation.tasks.length+1,
      user_id: t_values.selected.id,
      name: t_values.newTask,
      description: t_values.newDescription,
      assigned_start_time: t_values.newStartTime,
      assigned_end_time: t_values.newEndTime
    })
    this.setState({eventCreation: newTasks });
    const defaults = { 
      newTask: "",
      newDescription: "",
      newStartTime: "",
      newEndTime: ""
    };
    let defaultValues = Object.assign({},this.state.eventCreation,defaults);
    // console.log(defaultValues);
    this.setState({eventCreation: defaultValues});
    this.updateTimeline();    
  }
  newEventName = (event) => {
    //watch for values added to new task name
    // console.log(event.target.value);
    let newName = Object.assign({},this.state.eventCreation);
    newName.name = event.target.value;
    this.setState({eventCreation: newName});
  }
  newEventDescription = (event) => {
    //watch for values added to new task description
    // console.log(event.target.value);
    let newEventDescription = Object.assign({},this.state.eventCreation);
    newEventDescription.description = event.target.value;
    this.setState({eventCreation: newEventDescription});
  }
  newEventDate = (event) => {
    //watch for values added to new task start time
    // console.log(event.target.value);
    let newEventDate = Object.assign({},this.state.eventCreation);
    newEventDate.date = event.target.value;
    this.setState({eventCreation: newEventDate});
  }
  newTask = (event) => {
    //watch for values added to new task name
    // console.log(event.target.value);
    let newTask = Object.assign({},this.state.eventCreation);
    newTask.newTask = event.target.value;
    this.setState({eventCreation: newTask});
  }
  newDescription = (event) => {
    //watch for values added to new task description
    // console.log(event.target.value);
    let newDescription = Object.assign({},this.state.eventCreation);
    newDescription.newDescription = event.target.value;
    this.setState({eventCreation: newDescription});
  }
  newStartTime = (event) => {
    //watch for values added to new task start time
    // console.log(event.target.value);
    let newST = Object.assign({},this.state.eventCreation);
    newST.newStartTime = event.target.value;
    this.setState({eventCreation: newST});
  }
  newEndTime = (event) => {
    //watch for values added to new task end time
    // console.log(event.target.value);
    let newET = Object.assign({},this.state.eventCreation);
    newET.newEndTime = event.target.value;
    this.setState({eventCreation: newET});
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.socket.send(this.state.insert)
  }
  handleChange = (e) => {
    e.preventDefault();
    // console.log(e.target.value)
    this.setState({insert: e.target.value})
  }
  eventCreationSelectToggle = (e) => {
    let newSelected = Object.assign({},this.state.eventCreation);
    const newId =  e.target.getAttribute('data-id');
    if (newId === this.state.eventCreation.selected.id){
      newSelected.selected.name = "";
      newSelected.selected.id = NaN;
    } else {
      newSelected.selected.name = "";
      newSelected.selected.id = NaN;
      newSelected.selected.name = this.state.eventCreation.assigned_people.filter((p)=> parseInt(p.id,10) === parseInt(newId,10))[0].name;
      newSelected.selected.id = newId;
    }
    this.setState({
      eventCreation: newSelected
    }); 
  }
  componentDidMount() {
    // console.log("componentDidMount <App />");
    const mysocket = new WebSocket("ws://localhost:3001");
    this.socket = mysocket;
    this.socket.onconnect = (event) => {
      console.log(`Connected! : ${event}`);
    }
    this.socket.onmessage = (event) => {
      console.log(`From server: ${event.data}`);
      // this.newMessageFromServer(event.data);
    }
    this.updateTimeline();
  }
  componentDidUpdate(previousProps, previousState) {
    // only update chart if the data has changed
    if(previousState.eventCreation.tasks.length !== this.state.eventCreation.tasks.length){
      console.log('detected task added')
      this.updateTimeline();
    }
  }
  render() {
    return (
      <div className="App">
        <h1> Micromanage your next event</h1>
        {/*<InsertForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} />*/}
        <div className="event-wrapper">
          <div className="event-creation-form">
            <EventCreationForm 
              {...this.state} 
              eventCreationSelectToggle={this.eventCreationSelectToggle} 
              addTask={this.addTask} 
              newTask={this.newTask}
              newDescription={this.newDescription}
              newStartTime={this.newStartTime}
              newEndTime={this.newEndTime}
              newEventDate={this.newEventDate}
              newEventDescription={this.newEventDescription}
              newEventName={this.newEventName}
              updateTimeline={this.updateTimeline}
              handleAssignedPerson={this.handleAssignedPerson}
              addNewAssignedUser={this.addNewAssignedUser}
              handleAssignedEmail={this.handleAssignedEmail}
              />
          </div>
          <div className='timeline'>
            <Timeline data={this.state.eventCreation.timelineData} />
          </div>
        </div>
        <div><button className="waves-effect waves-light btn-large">CREATE PROJECT <i className="material-icons right">track_changes</i></button></div>
      </div>
    );
  }
}

export default App;
