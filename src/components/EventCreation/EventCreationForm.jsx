import React, { Component, PropTypes, createElement as ce } from 'react';
import '../../../styles/App.css';
import NewTaskFields from './NewTaskFields.jsx';
import AddNewPersonButton from './AddNewPersonButton.jsx';
import EventCreateTasksCard from './EventCreateTasksCard';
import EventInfoCard from './EventInfoCard.js';
import EventUsersCard from './EventUsersCard.js';
import { Timeline } from 'react-chartkick';

// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import * as eventActions from '../../actions/courseActions';
// import {browserHistory} from 'react-router';
// import { createStore, combineReducers, applyMiddleware } from 'redux'
class EventCreationForm extends Component {
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
            <EventInfoCard 
              name={name} 
              description={description} 
              startDate={startDate} 
              endDate={endDate} 
              updateEventState={updateEventState} 
            />
          </div>
          <div className='col s12 m3'>
            <div className="card-move-up card z-depth-0 light-blue lighten-2">
              <span className="card-title white-text">People</span>
              <AddNewPersonButton {...this.props} />
            </div>
            <EventUsersCard
              personInputsDisabled={this.personInputsDisabled}
              assigned_people={assigned_people}
              selected={selected}
              eventCreationSelectToggle={eventCreationSelectToggle}
              eventCreationDeleteUser={eventCreationDeleteUser}
            />
          </div>
          <div className="col s12 m6">
            <div className="card-move-up card z-depth-0 light-blue lighten-2">
              <span className="card-title white-text">Tasks: {selected.name}</span>
              {this.addNewTaskButton()}
            </div>
            <EventCreateTasksCard {...this.props} eventCreationDeleteTask={eventCreationDeleteTask} />
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

// function mapStateToProps(state, ownProps) {
//   return {
//     courses: state.courses
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(courseActions, dispatch)
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(EventCreationForm);
export default EventCreationForm;