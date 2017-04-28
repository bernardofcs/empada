import * as types from '../actions/actionTypes';
import initialState from './initialState';

  submitEvent = () => {
    var payload = Object.assign({}, this.state);
    payload.type = 'eventCreation-newProject';
    this.socket.send(JSON.stringify(payload));
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

  updateTimeline = () => {
    const date = this.state.eventCreation.startDate;
    var timelineData = this.state.eventCreation.tasks.map( (t) => {
      return [this.state.eventCreation.assigned_people.filter((p)=> +p.id === +t.user_id)[0].name,
        new Date(date+' '+t.assigned_start_time),
        new Date(date+' '+t.assigned_end_time),
        '',
        '' ];
    });
    var newTimelineData = Object.assign({},this.state.eventCreation)
    newTimelineData.timelineData = timelineData;
    this.setState({ eventCreation: newTimelineData });
  }

  clearTaskFields = () => {
    const defaultValues = {
      newTask: '',
      newDescription: '',
      newStartTime: '',
      newEndTime: ''
    }
    var clearTasks = Object.assign({},this.state.eventCreation,defaultValues)
    this.setState({eventCreation: clearTasks});
  }

  addTask = () => {
    //add a new task to the task state, and add data to timeline.
    var newTasks = Object.assign({},this.state.eventCreation)
    if (
      newTasks.newTask !== '' &&
      newTasks.newDescription !== ''&&
      newTasks.newStartTime !== ''&&
      newTasks.newEndTime!== '' ) {
      const t_values = this.state.eventCreation;
      newTasks.tasks.push({
        id: this.state.eventCreation.tasks.length+1,
        user_id: t_values.selected.id,
        name: t_values.newTask,
        description: t_values.newDescription,
        assigned_start_time: t_values.newStartTime,
        assigned_end_time: t_values.newEndTime
      })
      newTasks.newTask = '';
      newTasks.newDescription = '';
      newTasks.newStartTime = '';
      newTasks.newEndTime= '';
      this.setState({eventCreation: newTasks });
      this.updateTimeline();
    }
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

  eventCreationDeleteUser = (index) => {
    let deleteUser = Object.assign({},this.state.eventCreation);
    let assigned_people = [...this.state.eventCreation.assigned_people];
    assigned_people.splice(index, 1);
    deleteUser.assigned_people = assigned_people;
    this.setState({eventCreation: deleteUser});

  }

  eventCreationDeleteTask = (index) => {
    let deleteTask = Object.assign({},this.state.eventCreation);
    let tasks = [...this.state.eventCreation.tasks];
    tasks.splice(index, 1);
    deleteTask.tasks = tasks;
    this.setState({eventCreation: deleteTask});
  }

  addNewProjectButton = () => {
    let disabled = "";
    if (this.state.eventCreation.name === ""
      || this.state.eventCreation.startDate === ""){
      disabled = "disabled";
    }

    return (
      <div className="fixed-action-btn">
        <a onClick={this.submitEvent} className={`${disabled} btn-floating btn-large waves-effect waves-light orange darken-3`}>
          <i className="material-icons">add</i>
        </a>
      </div>
    );
  };

  selectProject = (e) => {
    this.setState({selectedProject: {name: e.target.innerHTML, id: +e.target.getAttribute('data-id')}})
  }

export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
    case types.CREATE_COURSE_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.course)
      ];
    case types.UPDATE_COURSE_SUCCESS:
      return [
        ...state.filter(course => course.id !== action.course.id),
        Object.assign({}, action.course)
      ];
    default:
      return state;
  }
}