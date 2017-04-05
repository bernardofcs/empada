import React, { Component } from 'react';
import '../styles/App.css';
import Auth0Lock from 'auth0-lock'
import TaskDashboard from './TaskDashboard.js'
// import { Button, Modal } from 'react-materialize';
import ProgressBar from './ProgressBar.js';
import EventCreationForm from './EventCreationForm.jsx';
import DashboardTimeline from './DashboardTimeline.jsx';
import HomePage from './HomePage.jsx';
import Footerr from './Footer.jsx';
import Newsfeed from './Newsfeed.jsx';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import { default as Fade } from 'react-fade';
import ProjectSelection from './ProjectSelection.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserProjects: [], //[{id:1, name: 'Project 1'}, {id:2, name: 'Project 2'}, {id:3, name: 'Project 3'}],
      selectedProject: {
        // id: 1,
        // name: ''
      },
      currentWindow: 'EventCreationForm',
      eventCreationFormFade: false,
      TaskDashboardFade: false,
      dashboardFade: false,
      homePageFade: false,
      eventCreation: {
        selected: {name: "", id: NaN},
        startDate: "",
        endDate: "",
        name: "",
        description: "",
        newTask: "",
        newDescription: "",
        newStartTime: "",
        newEndTime: "",
        newAssignedPerson: "",
        newAssignedEmail: "",
        assigned_people: [
          // {
          //   name: 'Jimmy',
          //   id: 1,
          //   email: "jimmy@email.com"
          // },
          // {
          //   name: 'Johnny',
          //   id: 2,
          //   email: "Johnny@email.com"
          // },
          // {
          //   name: 'Sally',
          //   id: 3,
          //   email: "sally@email.com"
          // }
        ],
        tasks: [
          // {id: 1, user_id: 1, name: 'buy beer', description: 'go to LBCO',assigned_start_time: '08:00:00',assigned_end_time: '10:00:00'},
          // {id: 2, user_id: 1, name: 'buy cups', description: 'go to dollar store',assigned_start_time: '15:00:00',assigned_end_time: '17:00:00'},
          // {id: 3, user_id: 2, name: 'bring music', description: 'check out spotify',assigned_start_time: '09:00:00',assigned_end_time: '11:00:00'},
          // {id: 4, user_id: 3, name: 'wash car', description: 'clean my car yo',assigned_start_time: '11:00:00',assigned_end_time: '18:00:00'}
        ],
        timelineData: [
          // ["Jimmy", new Date(2017, 3, 25, 17, 0), new Date(2017, 3, 25, 17, 30)],
          // ["Johnny", new Date(2017, 3, 25, 8, 0), new Date(2017, 3, 25, 10, 0)],
          // ["Sally",  new Date(2017, 3, 25, 1, 0), new Date(2017, 3, 25, 3, 0)]
        ]
      },
      alertOptions :{
        offset: 14,
        position: 'bottom left',
        theme: 'dark',
        time: 5000,
        transition: 'scale'
      },
      dashboardTimelineTasks: [],
      allTasks: [],
      modalIsOpen: false,
      grace_period: 0,//300000,
      newsfeed: [],
      progress_bar : [],
      clickedStartButton : [],
      clickedEndButton : [],
      updatedProgressBar: 0
    };

    // this.openModal = this.openModal.bind(this);
    // this.afterOpenModal = this.afterOpenModal.bind(this);
    // this.closeModal = this.closeModal.bind(this);
  }

  //page changing

  displayEventCreationFormPage = () => {
    this.setState({
      currentWindow: 'EventCreationForm',
      dashboardTimelineTasks: []
    })
  }

  displayDashboardPage = () => {
    this.setState({currentWindow: 'Dashboard'});
    this.updateNewsfeed()
  }

  displayProjectSelectionPage = () => {
    this.setState({
      currentWindow:  'ProjectSelection',
      dashboardTimelineTasks: []
    })
  }

  displayTaskDashboard = () => {
    this.setState({currentWindow: 'TaskDashboard'});
    this.updateNewsfeed();
  }

  displayHomePage = () => {
    this.setState({
      currentWindow:  'HomePage',
      dashboardTimelineTasks: []
    })
  }


  componentWillMount = () => {
    // console.log("componentWillMount <App />");
    this.lock = new Auth0Lock('TejTiGWUQtFqn8hCNABYJ1KREwuDwyat', 'bfcsiqueira.auth0.com', {
      theme: {
        primaryColor: '#26e'
      },
      languageDictionary: {
        title: 'Authenticate'
      },
      closable: false,
      additionalSignUpFields: [{
        name: "given_name",
        placeholder: "Enter your first name",
        // icon: "https://example.com/name_icon.png",
        validator: (value) => {
          return value.length > 1
        }
      },{
        name: "family_name",
        placeholder: "Enter your last name",
        // icon: "https://example.com/name_icon.png",
        validator: (value) => {
          return value.length > 1
        }
      }]
    });

    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem("accessToken", authResult.accessToken);
      this.lock.getProfile(authResult.idToken, (err, profile) => {
        if (err) {
          console.log("Error loading the Profile", err);
          return;
        }
        localStorage.setItem("profile", JSON.stringify(profile));
        this.setState({profile: profile});
        this.handleLogin()
      });
    });
  }

  showLock = () => {
    // Show the Auth0Lock widget
    this.lock.show();
  }

  logout = () => {
    this.setState({
      profile: undefined,
      selectedProject: {},
      currentUserProjects: []
    })
    localStorage.removeItem("profile")
    // this.showLock()
  }

  renderNewsfeed = (data) => {
    // this.setState({ allTasks: data });

    const newsfeed = [];
    for (let item of this.state.allTasks) {
      item.assigned_start_time = item.assigned_start_time ? new Date(item.assigned_start_time) : null;
      item.assigned_end_time = item.assigned_end_time ? new Date(item.assigned_end_time) : null;
      item.start_time = item.start_time ? new Date(item.start_time) : null;
      item.end_time = item.end_time ? new Date(item.end_time) : null;

      if (item.start_time) {
        newsfeed.push({
          type:   'assigned_user_action',
          user:   item.user.first_name,
          task:   item.name,
          action: 'started_task',
          action_time: item.start_time,
          assigned_time: item.assigned_start_time,
          notification_time: item.start_time
        })
      }

      if (item.end_time) {
        newsfeed.push({
          type:   'assigned_user_action',
          user:   item.user.first_name,
          task:   item.name,
          action: 'completed_task',
          action_time: item.end_time,
          assigned_time: item.assigned_end_time,
          notification_time: item.end_time
        })
      }

      if (new Date(item.assigned_start_time.getTime() + this.state.grace_period) < item.start_time
        || (
          (new Date() - item.assigned_start_time > this.state.grace_period)
          && !(item.start_time)
          )
        ) {
        newsfeed.push({
          type:   'task_timing',
          user:   item.user.first_name,
          task:   item.name,
          action: 'task_not_started', //'task_not_completed'
          assigned_time: item.assigned_start_time,
          notification_time: item.assigned_start_time + this.state.grace_period
        })
      }

      if (new Date(item.assigned_end_time.getTime() + this.state.grace_period) < item.end_time
        || (
          (new Date() - item.assigned_end_time > this.state.grace_period)
          && !(item.end_time)
          )
        ) {
        newsfeed.push({
          type:   'task_timing',
          user:   item.user.first_name,
          task:   item.name,
          action: 'task_not_completed',
          assigned_time: item.assigned_end_time,
          notification_time: item.assigned_end_time + this.state.grace_period
        })
      }
    };

    newsfeed.sort((a, b) => {
      return new Date(a.notification_time).getTime() < new Date(b.notification_time).getTime();
    })

    // const newsfeed = fromDb.map((item, index) => {
    this.setState({
      newsfeed: newsfeed.map((item, index) => {
        let notif_type = [];
        switch(item.type) {
          case 'assigned_user_action':
            if (item.action === 'started_task') {
              notif_type = ['Started', 'start'];
            } else if (item.action === 'completed_task') {
              notif_type = ['Completed', 'completion'];
            }

            if (item.action_time > item.assigned_time
              && (item.action_time - item.assigned_time) > this.state.grace_period) { //difference of less than 5 minutes gets no notification
              notif_type.push('red','late', 'thumb_down');
            } else if (item.action_time < item.assigned_time
              && (item.assigned_time - item.action_time) > this.state.grace_period) {
              notif_type.push('green','early', 'thumb_up');
            } else {
              notif_type.push('blue','on time', 'alarm_on'); // alternative icon: 'schedule'
            }

            return (
              <div className="card notification waves-effect waves-block waves-light">
                <div className="card-content activator">
                    <span className={`new badge ${notif_type[2]} activator`} data-badge-caption={`${notif_type[3]}`}>
                      <i className="material-icons tiny activator">{`${notif_type[4]}`}</i>
                    </span>
                    {`${item.user} has ${notif_type[0].toLowerCase()} ${item.task}`}
                </div>

                <div className="card-reveal">
                  <span className="card-title"><i className="material-icons right">close</i></span>
                  <dl>
                    <dt><b>Task:</b> {item.task}</dt>
                    <dt><b>{`${notif_type[0]}`} at:</b> {`${item.action_time}`}</dt>
                    <dt><b>Expected {`${notif_type[1]}`} time:</b> {`${item.assigned_time}`}</dt>
                  </dl>
                </div>
              </div>
            );

          case 'task_timing':
            if (item.action === 'task_not_started') {
              notif_type = ['Started', 'start'];
            } else if (item.action === 'task_not_completed') {
              notif_type = ['Completed', 'completion'];
            }
            notif_type.push('late', 'thumb_down');

            return (
              <div className="card notification waves-effect waves-block waves-light">
                <div className="card-content activator">
                  <span className="new badge red activator" data-badge-caption={`${notif_type[2]}`}>
                    <i className="material-icons tiny activator">{`${notif_type[3]}`}</i>
                  </span>
                  {`${item.user} has not ${notif_type[0].toLowerCase()} ${item.task}`}
                </div>
                <div className="card-reveal">
                  <span className="card-title"><i className="material-icons right">close</i></span>
                  <dl>
                    <dt><b>Task:</b> {item.task}</dt>
                    <dt><b>Expected {`${notif_type[1]}`} time:</b> {`${item.assigned_time}`}</dt>
                  </dl>
                </div>
              </div>
            );

          case 'project_progress':
            notif_type = [];
            if (item.action === 'percent_completed') {
              notif_type.push('', 'blue', 'on time', 'alarm_on');
            } else if (item.action === 'percent_expected') {
              notif_type.push('expected to be ', 'red', 'late', 'thumb_down');
            }

            return (
              <div className="card notification waves-effect waves-block waves-light">
                <div className="card-content">
                  <span className={`new badge ${notif_type[1]}`} data-badge-caption={`${notif_type[2]}`}>
                    <i className="material-icons tiny">{`${notif_type[3]}`}</i>
                  </span>
                  {`${item.percent} of project ${notif_type[0]}complete.`}
                </div>
              </div>
            );

          default:
            throw new Error(`Unknown event type in newsfeed: ${item.type}`);
        }
      })
    })

  }

  updateNewsfeed = () => { this.socket.send(JSON.stringify({type: 'askingForNewsfeedUpdate', projectId: this.state.selectedProject.id})) }

  timelineTaskFormatting = (data) => {
    this.setState({allTasks: data});

    let tasks = [];
    const timing = ['early start', 'late start', 'as scheduled', 'completed early', 'completed late', 'not started'];
    for (let key of Object.keys(this.state.allTasks)) {
      const task = this.state.allTasks[key];
      // console.log('task inside timelineTaskFormatting');
      // console.log(task);

      task.assigned_start_time = task.assigned_start_time ? new Date(task.assigned_start_time) : null;
      task.assigned_end_time = task.assigned_end_time ? new Date(task.assigned_end_time) : null;
      task.start_time = task.start_time ? new Date(task.start_time) : null;
      task.end_time = task.end_time ? new Date(task.end_time) : null;

      let temp = {};
      temp.start_time = task.start_time;
      temp.end_time = task.end_time;

      if (temp.start_time && !(temp.end_time)) {
        temp.end_time = new Date();
      } else if (!(temp.start_time)) {
        tasks.push([
          task.name,
          task.assigned_start_time,
          task.assigned_end_time,
          timing[5],
          task.user.first_name
        ]);
        continue;
      }

      // console.log(temp.start_time);
      // console.log(task.assigned_start_time);
      // console.log(temp.start_time < task.assigned_start_time);
      // console.log(temp.end_time);

      if (temp.start_time < task.assigned_start_time
        && temp.end_time < task.assigned_end_time
        && task.assigned_start_time < temp.end_time) {
        tasks.push([
          task.name,
          temp.start_time,
          task.assigned_start_time,
          timing[0],
          task.user.first_name
        ],
        [
          task.name,
          task.assigned_start_time,
          temp.end_time,
          timing[2],
          task.user.first_name

        ],
        [
          task.name,
          temp.end_time,
          task.assigned_end_time,
          timing[3],
          task.user.first_name
        ])
      } else if (temp.start_time < task.assigned_start_time
        && temp.end_time > task.assigned_end_time) {
        tasks.push([
          task.name,
          temp.start_time,
          task.assigned_start_time,
          timing[0],
          task.user.first_name
        ],
        [
          task.name,
          task.assigned_start_time,
          task.assigned_end_time,
          timing[2],
          task.user.first_name
        ],
        [
          task.name,
          task.assigned_end_time,
          temp.end_time,
          timing[4],
          task.user.first_name
        ])
      } else if (temp.start_time > task.assigned_start_time
        && temp.end_time < task.assigned_end_time) {
        tasks.push([
          task.name,
          task.assigned_start_time,
          temp.start_time,
          timing[1],
          task.user.first_name
        ],
        [
          task.name,
          temp.start_time,
          temp.end_time,
          timing[2],
          task.user.first_name
        ],
        [
          task.name,
          temp.end_time,
          task.assigned_end_time,
          timing[3],
          task.user.first_name
        ])
      } else if (temp.start_time > task.assigned_start_time
        && temp.end_time > task.assigned_end_time
        && temp.start_time < task.assigned_end_time) {
        tasks.push([
          task.name,
          task.assigned_start_time,
          temp.start_time,
          timing[1],
          task.user.first_name
        ],
        [
          task.name,
          temp.start_time,
          task.assigned_end_time,
          timing[2],
          task.user.first_name
        ],
        [
          task.name,
          task.assigned_end_time,
          temp.end_time,
          timing[4],
          task.user.first_name
        ])
      } else if (temp.end_time < task.assigned_start_time) {
        tasks.push([
          task.name,
          temp.start_time,
          temp.end_time,
          timing[3],
          task.user.first_name
        ],
        [
          task.name,
          task.assigned_start_time,
          task.assigned_end_time,
          timing[3],
          task.user.first_name
        ])
      } else if (temp.start_time > task.assigned_end_time) {
        tasks.push([
          task.name,
          temp.start_time,
          temp.end_time,
          timing[5],
          task.user.first_name
        ],
        [
          task.name,
          task.assigned_start_time,
          task.assigned_end_time,
          timing[1],
          task.user.first_name
        ])
      }
    };

    const colorMap = {
      // should contain a map of category -> color for every category
      'early start'     : '#139A43',
      'late start'      : '#F26430',
      'as scheduled'    : '#279AF1',
      'completed early' : '#139A43',
      'completed late'  : '#F26430',
      'not started'     : '#F26430'
    };
    // debugger;

    tasks = tasks.map((arr) => {
      console.log(arr);
      arr.push(colorMap[arr[3]]);
      arr[3] = `${arr[4]} - ${arr[3]}`;
      arr.splice(4,1);
      return arr
    });

    this.setState({'dashboardTimelineTasks': tasks});
  }

  updateProgressBarsonPageLoad = (taskIds) => {
    const newProgressBar = this.state.progress_bar.slice();
    taskIds.forEach((taskId)=>{
      const targetId = +taskId;
      const { progress_bar = [], allTasks = [], clickedStartButton = [] } = this.state;

      const targetTask = allTasks.find((task) => task.id === targetId);
      const targetUserId = targetTask.userId
      const buttonClicked = clickedStartButton.find((id) => id === targetId);


      if (buttonClicked !== targetId) {
        // console.error("You must begin a task before you can end it!");
        // Alert.error("You must begin a task before you can end it!");
      } else {

        const userProgress = progress_bar
          .filter((v) => v)
          .find(({ userId }) => userId === targetUserId)
        // .find(({ projectId }) => projectId === targetUserId);

        if (progress_bar.find(({ userId }) => userId === +targetUserId)) {

          const progIdx = progress_bar.indexOf(userProgress);

          const taskStart = allTasks.find(({ userId }) => userId === targetUserId);

          const percentOfTasksToChange = 100 / userProgress.total_tasks;


          newProgressBar[progIdx] = {
            ...userProgress,
            completed_tasks: Math.min(100, userProgress.completed_tasks + percentOfTasksToChange),
            incomplete_tasks: Math.max(0, userProgress.incomplete_tasks - percentOfTasksToChange),
          };
        }
      }
    })
    // console.log(newProgressBar)
    this.setState({progress_bar: newProgressBar})
    // this.setState(Object.assign({},this.state,{progress_bar: newProgressBar}));
  }

  updateCompletedAndIncompleteTasks = ({ target: { value } }) => {
    const targetId = +value;
    const { progress_bar = [], allTasks = [], clickedStartButton = [] } = this.state;

      const targetTask = allTasks.find((task) => task.id === targetId);
      const targetUserId = targetTask.userId
      const buttonClicked = clickedStartButton.find((id) => id === targetId);
      // console.log('clicked button', buttonClicked)


      if (buttonClicked !== targetId) {
        console.error("You must begin a task before you can end it!");
        Alert.error("You must begin a task before you can end it!");
      } else {

      const userProgress = progress_bar
        .filter((v) => v)
        .find(({ userId }) => userId === targetUserId)
        // .find(({ projectId }) => projectId === targetUserId);

      if (progress_bar.find(({ userId }) => userId === +targetUserId)) {

        const progIdx = progress_bar.indexOf(userProgress);
        const taskStart = allTasks.find(({ userId }) => userId === targetUserId);
        // console.log('task id', targetId)
        // console.log('user id start time', taskStart.userId)
        const percentOfTasksToChange = 100 / userProgress.total_tasks;
        const newProgressBar = progress_bar.slice();
        newProgressBar[progIdx] = {
          ...userProgress,
          completed_tasks: Math.min(100, userProgress.completed_tasks + percentOfTasksToChange),
          incomplete_tasks: Math.max(0, userProgress.incomplete_tasks - percentOfTasksToChange),
        };

        this.socket.send(JSON.stringify({
          type: 'end-time-for-contractor-tasks-and-updating-progress-bar',
          progress_bar: newProgressBar,
          end_time: new Date(),
          id: targetId,
          disabledEndButton: this.state.disabledEndButton
        }));
      }
    }
  }

  checkStartTime = () => {
    const { allTasks = [] } = this.state;
    const startTime = allTasks.filter((task) => task.start_time !== null);
    startTime.forEach((e) => {
      this.setState({ clickedStartButton: [...this.state.clickedStartButton, e.id] });
    })
  }

  checkEndTime = () => {
    const { allTasks = [] } = this.state;
    const endTime = allTasks.filter((task) => task.end_time !== null);
    endTime.forEach((e) => {
      this.setState({ clickedEndButton: [...this.state.clickedEndButton, e.id] });
    })
  }

  handleStartTask = (e) => {
    e.preventDefault();

    // console.log('task id', e.target.value)

    let message = {
      type: 'start-time-for-contractor-tasks',
      start_time: new Date(),
      id: +e.target.value,
      progress_bar: this.state.progress_bar,
      disabledStartButton: this.state.disabledStartButton
    }
    // console.log('start task button pressed');
    this.socket.send(JSON.stringify(message));
  }

  serverStateStore = (e) => {
    if (this.state.counter.length > 1) {
      let message = {
        type: 'server-state-store'
      }
      this.socket.send(JSON.stringify(message));
    }
  }

  updateProgressBar = () => {
    this.socket.send(JSON.stringify({type: 'request-tasks-and-users'}));
  }

  componentDidUpdate(previousProps, previousState) {
    if(previousState.eventCreation.timelineData.length !== this.state.eventCreation.timelineData.length){
      // console.log('detected timeline updated')
      this.clearTaskFields();
    }
    if (previousState.clickedEndButton.length !== this.state.clickedEndButton.length && this.state.updatedProgressBar !== 1 ){
      let onlyEndDateTasks = this.state.allTasks.filter((task) => task.end_date !== null ).map((task)=> task.id)
      this.updateProgressBarsonPageLoad(onlyEndDateTasks)
      this.setState({updatedProgressBar: 1})
    }
  }

  componentDidMount() {
    // console.log("componentDidMount <App />");

    this.updateTimeline();
    // this.updateNewsfeed();

    setTimeout(() => {
      if (!localStorage.profile) {
        // this.showLock();
      } else {
        const storageProfile = JSON.parse(localStorage.profile)
        this.setState({profile: storageProfile})
        const askForProjectsObj = {type: 'getProjectListforManager', email: this.state.profile.email} //add to successful project creation
        this.socket.send(JSON.stringify(askForProjectsObj)) //add to successful project creation
      }
    }, 1000)

    this.socket = new WebSocket("ws://localhost:3001");
    // this.socket = new WebSocket('ws://chatserverwebsocketswichopy.herokuapp.com/')

    this.socket.onopen = () => {
      console.log('Connected to server!');
      this.socket.send(JSON.stringify({type: 'request-tasks-and-users'}));
      setTimeout(() => {
        this.checkStartTime();
        this.checkEndTime();
      }, 1800);
    }

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {

        case 'update-project-list':
          this.setState({ currentUserProjects: data.projects });
          break;

        case "start-time-button-clicked":
          // console.log('clicked start time')
          this.checkStartTime();
          this.setState({ clickedStartButton: [...this.state.clickedStartButton, +data.id] });
          break;

        case "end-time-button-clicked":
          // console.log('clicked end time')
          this.checkEndTime();
          this.setState({ clickedEndButton: [...this.state.clickedEndButton, +data.id] });
          break;

        case 'update-progress-bar-with-new-field':
          this.updateProgressBar();
          break;

        case 'update-progress-bar':
          this.setState(Object.assign({},this.state,{progress_bar: data.progress_bar}));
          break;

        case 'set-progress-bar-state':
          let updateProgressBarState = this.state;
          updateProgressBarState.progress_bar = data.progress_bar;
          this.setState(updateProgressBarState);
          break;

        case 'set-disabled-start-button-state':
          let updateStartButtonState = this.state;
          updateStartButtonState.progress_bar = data.clickedStartButton;
          this.setState(updateStartButtonState);
          break;

        case 'set-disabled-end-button-state':
          let updateEndButtonState = this.state;
          updateEndButtonState.progress_bar = data.clickedEndButton;
          this.setState(updateEndButtonState);
          break;

        case 'progress-bar-update':
          // console.log(data);
          let task = data.tasks.filter((t) => {
              return t.id;
          });

          let user = data.users.filter((u) => {
            return u.id;
          });

          let progress_bar = {};

          task.forEach((t) => {
            let key = t.userId + '/' + t.projectId;
            if (progress_bar[key] && progress_bar[t.projectId])  {
              progress_bar[key].total_tasks += 1;
            } else {
              progress_bar[key] = {};
              progress_bar[key].total_tasks = 1;
              progress_bar[key].userId = t.userId;
              progress_bar[key].projectId = t.projectId;
              user.forEach((u) => {
                if (t.userId === u.id) {
                  progress_bar[key].name = u.first_name;
                }
              })

              if (progress_bar[key].incomplete_tasks === undefined) {
                progress_bar[key].incomplete_tasks = 100;
                progress_bar[key].completed_tasks = 0;
              } else {
                progress_bar[key].incomplete_tasks = this.state[t.userId].incomplete_tasks;
                progress_bar[key].completed_tasks = this.state[t.userId].completed_tasks;
              }
            }
          })

          // just gets the values the progress_bar map
          const pBar = Object.keys(progress_bar).map(key => progress_bar[key]);
          // console.log('progress_bar', pBar);

          let newProgressBarState = {
            progress_bar: pBar
          }

          this.setState(newProgressBarState);
          break;

        case 'allTasks':
          this.timelineTaskFormatting(data.data);
          this.renderNewsfeed(data.data);
          break;

        case 'successful-event-creation':
          Alert.success("Successfully created a new project!");
          this.setState({eventCreation: Object.assign({},this.state.eventCreation,{
            selected: {name: "", id: NaN},
            startDate: "",
            endDate: "",
            name: "",
            description: "",
            newTask: "",
            newDescription: "",
            newStartTime: "",
            newEndTime: "",
            newAssignedPerson: "",
            newAssignedEmail: "",
            assigned_people: [],
            tasks: [],
            timelineData: []
          }
          )})
          const askForProjectsObj = {type: 'getProjectListforManager', email: this.state.profile.email} //add to successful project creation
          this.socket.send(JSON.stringify(askForProjectsObj))
          break;

        default:
          console.error('Failed to send back');
      }
      // console.log(this.state);
    }
  }

  handleLogin = () => {
    // console.log(this.state.profile.email)
    const loginObj = {type: 'auth0-login', email:this.state.profile.email, first_name: this.state.profile.given_name, last_name: this.state.profile.family_name}
    this.socket.send(JSON.stringify(loginObj))
  }

  submitEvent = () => {
    console.log(this.state);
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

  handleAssignedEmail = (event) => {
    this.setState({eventCreation: Object.assign({},this.state.eventCreation, {newAssignedEmail: event.target.value})});
  }

  handleAssignedPerson = (event) => {
    this.setState({eventCreation: Object.assign({},this.state.eventCreation, {newAssignedPerson: event.target.value})});
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

  newEventName = (event) => {
    this.setState({eventCreation: Object.assign({},this.state.eventCreation,{name: event.target.value})});
  }

  newEventDescription = (event) => {
    this.setState({eventCreation: Object.assign({},this.state.eventCreation,{description: event.target.value})});
  }

  newEventEndDate = (event) => {
    this.setState({eventCreation: Object.assign({},this.state.eventCreation, {endDate: event.target.value})});
  }

  newEventStartDate = (event) => {
    this.setState({eventCreation: Object.assign({},this.state.eventCreation, {startDate: event.target.value})});
  }

  newTask = (event) => {
    this.setState({eventCreation: Object.assign({},this.state.eventCreation,{newTask: event.target.value})});
  }

  newDescription = (event) => {
    this.setState({eventCreation: Object.assign({},this.state.eventCreation, {newDescription: event.target.value})});
  }

  newStartTime = (event) => {
    this.setState({eventCreation: Object.assign({},this.state.eventCreation, {newStartTime: event.target.value}) });
  }

  newEndTime = (event) => {
    this.setState({eventCreation: Object.assign({},this.state.eventCreation, {newEndTime: event.target.value})});
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
    // console.log('delete this user')
    // console.log(this.state.eventCreation.assigned_people[index]);
    let deleteUser = Object.assign({},this.state.eventCreation);
    let assigned_people = [...this.state.eventCreation.assigned_people];
    assigned_people.splice(index, 1);
    deleteUser.assigned_people = assigned_people;
    this.setState({eventCreation: deleteUser});

  }

  eventCreationDeleteTask = (index) => {
    // console.log('delete this task')
    // console.log(this.state.eventCreation.tasks[index]);
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

  render() {
    return (
      <div className="App blue-grey lighten-5">
        <nav className="nav-extended light-blue lighten-1">
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo left"><i className="large material-icons">av_timer</i>EMPADA</a>
            {/*<a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>*/}

            <ul id="nav-mobile" className="right">
              {!(this.state.profile) &&
                <li>
                  <a className="waves-effect waves-light btn green lighten-2" onClick={this.showLock}>Sign In</a>
                </li>
              }
              <li><a className="waves-effect waves-light btn green lighten-2" onClick={this.logout}>Log out</a></li>
              {this.state.profile &&
                <li>
                  Logged in as: {this.state.profile.email}
                </li>
              }
            </ul>

            {/*<ul className="side-nav" id="mobile-demo">
              <li><a onClick={this.showLock}>Sign In</a></li>
              <li><a onClick={this.logout}>Log out</a></li>
              {this.state.profile &&
                <li className='active'>
                  <a>Logged in as: {this.state.profile.email}</a>
                </li>
              }
            </ul>*/}
          </div>

          <div className='nav-content'>
            <ul className="tabs tabs-transparent">
              <li className="tab" onClick={this.displayHomePage}><a href="#">Home</a></li>
              <li className="tab" onClick={this.displayEventCreationFormPage}><a className="active" href="#">Create Event</a></li>
              <li className="tab" onClick={this.displayProjectSelectionPage}><a href="#">Projects</a></li>
              {Object.keys(this.state.selectedProject).length !== 0 &&
                <li className="tab" onClick={this.displayDashboardPage}><a href="#">{this.state.selectedProject.name}</a></li>
              }
              <li className="tab" onClick={this.displayTaskDashboard}><a href="#">Task Dashboard</a></li>
            </ul>
          </div>
        </nav>

        {this.state.currentWindow === 'TaskDashboard' &&
          <Fade out={this.state.TaskDashboardFade} duration={0.7} style={{visibility: 'visible'}} >
            <TaskDashboard
              handleStartTask={this.handleStartTask}
              listOfTasks={this.state.allTasks}
              updateCompletedAndIncompleteTasks={this.updateCompletedAndIncompleteTasks}
              clickedStart={this.state.clickedStartButton}
              clickedEnd={this.state.clickedEndButton}
              selectedProject={this.state.selectedProject}
            />
          </Fade>
        }


        {this.state.profile &&
          <div>
            {this.state.currentWindow === 'ProjectSelection' &&
              <Fade out={this.state.projectSelectionFade} duration={0.7} style={{visibility: 'visible'}} >
                <ProjectSelection
                  selectedProject={this.state.selectedProject}
                  currentUserProjects={this.state.currentUserProjects}
                  selectProject={this.selectProject}
                />
              </Fade>
            }

            {this.state.currentWindow === 'EventCreationForm' &&
              <Fade out={this.state.eventCreationFormFade} duration={0.7} style={{visibility: 'visible'}} >
                <div className="event-creation-form">
                  <EventCreationForm
                    {...this.state}
                    eventCreationDeleteUser={this.eventCreationDeleteUser}
                    eventCreationDeleteTask={this.eventCreationDeleteTask}
                    submitEvent={this.submitEvent}
                    eventCreationSelectToggle={this.eventCreationSelectToggle}
                    addTask={this.addTask}
                    clearTaskFields={this.clearTaskFields}
                    onNewTask={this.newTask}
                    onNewDescription={this.newDescription}
                    onNewStartTime={this.newStartTime}
                    onNewEndTime={this.newEndTime}
                    newEventStartDate={this.newEventStartDate}
                    newEventEndDate={this.newEventEndDate}
                    newEventDescription={this.newEventDescription}
                    newEventName={this.newEventName}
                    updateTimeline={this.updateTimeline}
                    handleAssignedPerson={this.handleAssignedPerson}
                    addNewAssignedUser={this.addNewAssignedUser}
                    handleAssignedEmail={this.handleAssignedEmail}
                  />
                </div>
                {this.addNewProjectButton()}
              </Fade>
            }

            {this.state.currentWindow === 'Dashboard' &&
              <Fade out={this.state.dashboardFade} duration={0.7} style={{visibility: 'visible'}} >
                <div className="row">
                  <div className="col s12 m3 push-m9">
                    <Newsfeed
                      newsfeed={this.state.newsfeed}
                      updateNewsfeed={this.updateNewsfeed}
                      renderNewsfeed={this.renderNewsfeed}
                    />
                  </div>

                  <div className="col s12 m9 pull-m3">
                    <ProgressBar
                      progressBar={this.state.progress_bar}
                      selectedProject={this.state.selectedProject}
                    />
                  </div>

                  <div className='col s12 m9 pull-m3'>
                    <DashboardTimeline tasks={this.state.dashboardTimelineTasks} />
                  </div>


                </div>
              </Fade>
            }

            <div>
              <span>
                  {this.props.children}
              </span>
              <Alert stack={{limit: 3}} effect='genie' timeout={5000} />
            </div>
          </div>
        }

        {this.state.currentWindow === 'HomePage' &&
          <Fade out={this.state.homePageFade} duration={0.7} style={{visibility: 'visible'}} >
            <HomePage />
            <Footerr />
          </Fade>
        }
      </div>
    );
  }
}

export default App;
