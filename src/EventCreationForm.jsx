import React, { Component } from 'react';
import '../styles/App.css';
import NewTaskFields from './NewTaskFields.jsx';
import AddNewPersonButton from './AddNewPersonButton.jsx';
import DeletePersonButton from './DeletePersonButton.jsx';
import DeleteTaskButton from './DeleteTaskButton.jsx'
import { Timeline } from 'react-chartkick';
// import { createStore, combineReducers, applyMiddleware } from 'redux'
const {tasks, name, description, startDate, assigned_people,  newAssignedEmail, newAssignedPerson, selected, timelineData} = this.props.eventCreation;
class EventCreationForm extends Component {
  addNewTaskButton = () => {
    let disabled = "";
    if (selected.name === ""){
      disabled = "disabled";
    }
    
    return (
      <a
        className={`${disabled} btn-floating halfway-fab waves-effect waves-light btn green lighten-2`}
        onClick={this.props.addTask}>
          <i className="material-icons">add</i>
      </a>
    );
  };

  personInputsDisabled = () => {
    let disabled = "";
    if (name === ""
      || startDate === "") {
      disabled = "disabled";
    }
    return (
      <div>
        <input disabled={`${disabled}`} type="text" value={newAssignedPerson} onChange={this.props.handleAssignedPerson} placeholder="Bob,Jim,Sally..." />
        <input disabled={`${disabled}`} type="email" value={newAssignedEmail} onChange={this.props.handleAssignedEmail} placeholder="Email@something.com..." />
      </div>
    );
  };



  render() {
    
    return (
      <div>
        <div className="row">
          <div className="col s12 m3">
            <div className="card-move-up card z-depth-0 light-blue lighten-2">
              <span className="card-title white-text">Event</span>
            </div>
            <div className="card-panel event-info">
              <div className="card-container">
                Event Name:
                  <input type="text" placeholder="THE MAIN EVENT!" value={name} onChange={this.props.newEventName} />
                  Event Description:
                  <input type="text" placeholder="Describe your event here" value={description} onChange={this.props.newEventDescription}/>
                  Event Start Date:
                  <input type="date" placeholder="2017/01/01" value={startDate} onChange={this.props.newEventStartDate}/>
                  {/*Event End Date:
                  <input type="date" placeholder="2017/01/01" value={this.props.eventCreation.endDate} onChange={this.props.newEventEndDate}/>*/}
              </div>
            </div>
          </div>

          <div className='col s12 m3'>
            <div className="card-move-up card z-depth-0 light-blue lighten-2">
              <span className="card-title white-text">People</span>
              <AddNewPersonButton {...this.props} />
            </div>
            <div className="card-panel event-users">
              <div className="card-container">
                {this.personInputsDisabled()}

                <div className="collection">
                  {assigned_people.map( (p, i) => {
                    return (
                      <a
                        key={p.id}
                        href="#!"
                        data-id={p.id}
                        className={
                          +selected.id === +p.id ?
                          "collection-item active green lighten-2" :
                          "collection-item"
                        }
                        onClick={this.props.eventCreationSelectToggle}>
                        {p.name} ({p.email})
                        <DeletePersonButton
                          eventCreationDeleteUser={this.props.eventCreationDeleteUser}
                          index={i}
                        />
                      </a>

                      );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="col s12 m6">
            <div className="card-move-up card z-depth-0 light-blue lighten-2">
              <span className="card-title white-text">Tasks: {selected.name}</span>
              {this.addNewTaskButton()}
            </div>
            <div className="card-panel event-create-tasks">
              <div className="card-container">

                <table>
                  <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <NewTaskFields
                    {...this.props}
                    functions={{
                      onNewTask: this.props.onNewTask,
                      onNewDescription: this.props.onNewDescription,
                      onNewStartTime: this.props.onNewStartTime,
                      onNewEndTime: this.props.onNewEndTime
                    }} />
                    {tasks
                      .filter((t)=> {
                        // console.log('filtering');
                        // console.log(t.user_id);
                        // console.log(this.props.eventCreation.selected.id);
                        return +t.user_id === +selected.id;
                      })
                      .map((t,i)=> {
                        // console.log('mapping')
                        return (
                          <tr key={i}>
                            <td data-task-id={t.id}>{t.name}</td>
                            <td data-task-id={t.id}>{t.description}</td>
                            <td data-task-id={t.id}>{t.assigned_start_time}</td>
                            <td data-task-id={t.id}>{t.assigned_end_time}</td>
                            <td>
                              <DeleteTaskButton
                                eventCreationDeleteTask={this.props.eventCreationDeleteTask}
                                index={i}
                              />
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

        <div className='row'>
          <div className="col s12">
            <div className="card-move-up card z-depth-0 light-blue lighten-2">
              <span className="card-title white-text">Timeline</span>
            </div>
            <div className='card-panel event-create-timeline'>
              <div className="card-container">
                <Timeline data={timelineData} />
              </div>
            </div>
          </div>
        </div>

        {/*<div><button onClick={this.props.submitEvent} className="waves-effect waves-light btn-large">CREATE PROJECT <i className="material-icons right">track_changes</i></button></div>*/}
    </div>
    );
  }
}

export default EventCreationForm;