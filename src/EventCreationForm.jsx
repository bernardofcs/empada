import React, { Component } from 'react';
import './App.css';
import NewTaskFields from './NewTaskFields.jsx';

class EventCreationForm extends Component {
  constructor(props){  
    super(props);
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
                    return (<a href="#!" data-id={p.id} className="collection-item" onClick={this.props.toggle}>{p.name}</a>);
                  })}
              </div>
            </div>
          </div>
          <div className="col s8">
            <div className="card-panel">
              <button className="waves-effect waves-light btn-large" onClick={this.props.addTask}>Add new task for {this.props.eventCreation.selected.name}</button>
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
                  <NewTaskFields {...this.state} {...this.props} functions={{
                    newTask: this.props.newTask,
                    newDescription: this.props.newDescription,
                    newStartTime: this.props.newStartTime,
                    newEndTime: this.props.newEndTime
                  }} />
                  {this.props.tasks
                    .filter((t)=> {
                      console.log('filtering');
                      console.log(t.user_id);
                      console.log(this.props.eventCreation.selected.id);
                      return t.user_id == this.props.eventCreation.selected.id;
                    })
                    .map((t)=> {
                      console.log('mapping')
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