import React, { Component } from 'react';
import './App.css';
import NewTaskFields from './NewTaskFields.jsx';

class EventCreationForm extends Component {
  constructor(props){  
    super(props);
    this.state = {
      selected: {name: "", id: NaN},
      newTask: "",
      newDescription: "",
      newStartTime: "",
      newEndTime: ""
    };
    this.toggle = this.toggle.bind(this);
    this.newTask = this.newTask.bind(this);
    this.newDescription = this.newDescription.bind(this);
    this.newStartTime = this.newStartTime.bind(this);
    this.newEndTime = this.newEndTime.bind(this);
  }
  toggle(e) {
    if (e.target.className === "collection-item active"){
      e.target.className = "collection-item";
    } else {
      e.target.className="collection-item active";
    }
    this.setState({
      selected: {
        name: e.target.innerHTML,
        id: e.target.getAttribute('data-id')
      }
    }); 
  } 
  newTask(event){
    console.log(event.target.value);
    this.setState({newTask: event.target.value});
  }
  newDescription(event){
    console.log(event.target.value);
    this.setState({newDescription: event.target.value});
  }
  newStartTime(event){
    console.log(event.target.value);
    this.setState({newStartTime: event.target.value});
  }
  newEndTime(event){
    console.log(event.target.value);
    this.setState({newEndTime: event.target.value});
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col s4">
            <div className="card-panel">
            <form onSubmit={this.props.handleSubmit}>
              <input type="text" onChange={this.props.handleNameChange} placeholder="THE MAIN EVENT!" ref="insert" />
              <input type="text" onChange={this.props.handleDescChange} placeholder="Descript your event here" />
              <input type="date" onChange={this.props.handleDateChange} placeholder="2017/01/01" />
              <input type="text" onChange={this.props.handleAssignedPerson} placeholder="Bob,Jim,Sally..." />
              <input type="submit"/>
            </form>
            </div>
            <div className="card-panel">
              <div className="collection">
                  {this.props.assigned_people.map( (p) => {
                    return (<a href="#!" data-id={p.id} className="collection-item" onClick={this.toggle}>{p.name}</a>);
                  })}
              </div>
            </div>
          </div>
          <div className="col s8">
            <div className="card-panel">
              {this.state.selected.name}
              <table>
                <thead>
                  <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                  </tr>
                </thead>
                <tbody>
                  <NewTaskFields {...this.state} functions={{
                    newTask: this.newTask,
                    newDescription: this.newDescription,
                    newStartTime: this.newStartTime,
                    newEndTime: this.newEndTime
                  }} />
                  {this.props.tasks
                    .filter((t)=> {
                      return t.user_id === this.state.selected.id;
                    })
                    .map((t)=> {
                      return (
                        <tr>
                          <td data-task-id={t.id}>{t.name}</td>
                          <td data-task-id={t.id}>{t.description}</td>
                          <td data-task-id={t.id}>{t.assigned_start_time}</td>
                          <td data-task-id={t.id}>{t.assigned_end_time}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </div>
    );
  }
}

export default EventCreationForm;