import React, { Component } from 'react';
import ReactInterval from 'react-interval';
// import { Col } from 'react-materialize'
import './App.css';

/*
Users:
- started a task
- completed a task
- user progress bar changes (combined with above)

task (without user action):
- task should have been started by now
- task should have been completed by now

project:
- big project milestones (eg 25%, 50%, 75%, 90%)
- comparing current progress to planned progress
*/

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      grace_period: 300000,
      newsfeed: []
    };
  }

  updateNewsFeed = () => {
    let fromDb = [
      {
        type:   'assigned_user_action',
        user:   'assigned_user',
        task:   'assigned_task',
        action: 'started_task', //'completed_task', 'progress_bar'
        action_time: new Date(2016, 11, 1, 9),
        assigned_time: new Date(2016, 11, 1, 9),
        notification_time: new Date(2016, 11, 1, 9)
      },
      {
        type:   'assigned_user_action',
        user:   'assigned_user',
        task:   'assigned_task',
        action: 'completed_task',
        action_time: new Date(2016, 11, 1, 9, 10),
        assigned_time: new Date(2016, 11, 1, 9, 0),
        notification_time: new Date(2016, 11, 1, 9, 10)
      },
      {
        type:   'assigned_user_action',
        user:   'assigned_user',
        task:   'assigned_task',
        action: 'started_task', //'completed_task', 'progress_bar'
        action_time: new Date(2016, 11, 1, 9, 1),
        assigned_time: new Date(2016, 11, 1, 9, 10),
        notification_time: new Date(2016, 11, 1, 9, 10)
      },
      {
        type:   'task_timing',
        user:   'assigned_user',
        task:   'assigned_task',
        action: 'task_not_started', //'task_not_completed'
        assigned_time: new Date(2016, 11, 1, 9, 10),
        notification_time: new Date(2016, 11, 1, 9, 15)
      },
      {
        type:   'task_timing',
        user:   'assigned_user',
        task:   'assigned_task',
        action: 'task_not_completed',
        assigned_time: new Date(2016, 11, 1, 9, 10),
        notification_time: new Date(2016, 11, 1, 9)
      },
      {
        type:   'project_progress',
        action: 'percent_completed', //'percent_expected' eg.Should be 50% at this point
        percantage: '50',
        notification_time: new Date(2016, 11, 1, 10)
      },
      {
        type:   'project_progress',
        action: 'percent_expected',
        percantage: '50',
        notification_time: new Date(2016, 11, 1, 10)
      }
    ]
    // this.state.newsfeed

    return this.setState({newsfeed: fromDb.map((item, index) => {
      let notif_type;
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
            <li>
              <div className="collapsible-header">
                <span className={`new badge ${notif_type[2]}`} data-badge-caption={`${notif_type[3]}`}></span>
                <i className="material-icons">{`${notif_type[4]}`}</i>
                <p>{`${item.user} has ${item.action}`}</p>
              </div>
              <div className="collapsible-body left-align">
                <dl>
                  <dt><b>Task:</b> {item.task}</dt>
                  <dt><b>{`${notif_type[0]}`} at:</b> {`${item.action_time}`}</dt>
                  <dt><b>Expected {`${notif_type[1]}`} time:</b> {`${item.assigned_time}`}</dt>
                </dl>
              </div>
            </li>
          );

        case 'task_timing':
          if (item.action === 'task_not_started') {
            notif_type = ['Started', 'start'];
          } else if (item.action === 'task_not_completed') {
            notif_type = ['Completed', 'completion'];
          }
          notif_type.push('late', 'thumb_down');

          return (
            <li>
              <div className="collapsible-header">
                <span className="new badge red" data-badge-caption={`${notif_type[2]}`}></span>
                <i className="material-icons">{`${notif_type[3]}`}</i>
                <p>{`${item.user} has not ${notif_type[0].toLowerCase()} ${item.task}`}</p>
              </div>
              <div className="collapsible-body left-align">
                <dl>
                  <dt><b>Task:</b> {item.task}</dt>
                  <dt><b>Expected {`${notif_type[1]}`} time:</b> {`${item.assigned_time}`}</dt>
                </dl>
              </div>
            </li>
          );

        case 'project_progress':
          notif_type = [];
          if (item.action === 'percent_completed') {
            notif_type.push('', 'blue', 'on time', 'alarm_on');
          } else if (item.action === 'percent_expected') {
            notif_type.push('expected to be ', 'red', 'late', 'thumb_down');
          }

          return (
            <li>
              <div className="collapsible-header">
                <span className={`new badge ${notif_type[1]}`} data-badge-caption={`${notif_type[2]}`}></span>
                <i className="material-icons">{`${notif_type[3]}`}</i>
                <p>{`${item.percent} of project ${notif_type[0]}complete.`}</p>
              </div>
            </li>
          );

        default:
          throw new Error(`Unknown event type in newsfeed: ${item.type}`);
      }
    })})
  }

  componentDidMount() {
    this.updateNewsFeed();
  }

  render() {
    const { newsfeed } = this.state;

    return (
      <div className="App row">
        <div className="col s4 offset-s8">
          <ul className="collapsible popout" data-collapsible="accordion">
            {newsfeed}
            <ReactInterval timeout={30000} enabled={true} callback={this.updateNewsFeed} />
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
