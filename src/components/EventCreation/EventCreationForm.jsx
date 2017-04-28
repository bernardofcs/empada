import React, { Component } from 'react';
import '../../../styles/App.css';
import NewTaskFields from './NewTaskFields.jsx';
import AddNewPersonButton from './AddNewPersonButton.jsx';
import NewTaskRow from './NewTaskRow.jsx';
import NewPeopleRow from './NewPeopleRow.jsx';
import { Timeline } from 'react-chartkick';
// import { createStore, combineReducers, applyMiddleware } from 'redux'
class EventCreationForm extends Component {
  // constructor(props) {
  //   super(props);
  // }
  addNewTaskButton = () => {
    let disabled = "";
    if (this.props.eventCreation.selected.name === ""){
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
    if (this.props.eventCreation.name === ""
      || this.props.eventCreation.startDate === "") {
      disabled = "disabled";
    }
    return (
      <div>
        <input disabled={`${disabled}`} type="text" value={this.props.eventCreation.newAssignedPerson} name='newAssignedPerson' onChange={this.props.updateEventState} placeholder="Bob,Jim,Sally..." />
        <input disabled={`${disabled}`} type="email" value={this.props.eventCreation.newAssignedEmail} name='newAssignedEmail' onChange={this.props.updateEventState} placeholder="Email@something.com..." />
      </div>
    );
  };

  render() {
  const {tasks, name, description, startDate, endDate, assigned_people, selected, timelineData} = this.props.eventCreation;
  const {eventCreationSelectToggle, eventCreationDeleteUser, eventCreationDeleteTask, updateEventState} = this.props
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
                  <input type="text" placeholder="THE MAIN EVENT!" value={name} name='name' onChange={updateEventState} />
                Event Description:
                  <input type="text" placeholder="Describe your event here" value={description} name='description' onChange={updateEventState}/>
                Event Start Date:
                  <input type="date" placeholder="2017/01/01" value={startDate} name='startDate' onChange={updateEventState}/>
                Event End Date:
                  <input type="date" placeholder="2017/01/01" value={endDate} name='endDate' onChange={updateEventState}/>
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
                  {assigned_people
                    .map( (p, i) => {
                      return <NewPeopleRow 
                                p={p} 
                                i={i} 
                                selected={selected} 
                                eventCreationSelectToggle={eventCreationSelectToggle} 
                                eventCreationDeleteUser={eventCreationDeleteUser}
                      />
                    })
                  }
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
                    />
                    {tasks
                      .filter((t)=> {
                        return +t.user_id === +selected.id;
                      })
                      .map((t,i)=> {
                        return <NewTaskRow 
                                t={t} 
                                i={i} 
                                eventCreationDeleteTask={eventCreationDeleteTask}
                        />
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