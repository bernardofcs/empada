import React, { Component } from 'react';
import ReactInterval from 'react-interval';
// import { Row, Col } from 'react-materialize';
import './App.css';
import InsertForm from './InsertForm.js'


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
      count: 1,
      grace_period: 300000,
      newsfeed: [
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
          notification_time: new Date(2016, 11, 1, 9)
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
          notification_time: new Date(2016, 11, 1, 9)
        }
      ]
    };
  }

  incrementCounter = () => {
    return this.setState({count: this.state.count + 1})
  }



  handleSubmit = (e) => {
    e.preventDefault();
    // console.log('submitted')
   console.log(this.state.insert)
  }

  handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value)
    this.setState({insert: e.target.value})
  }
  render() {
    const {count} = this.state;
    const NewsFeed = this.state.newsfeed.map((item, index) => {
      switch(item.type) {
        case 'assigned_user_action':
          let notif_type;
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
                {`${item.user} has ${item.action}`}
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
          if (new Date() - item.assigned_time > this.state.grace_period) {

          }

          return (
            <li>
              <div className="collapsible-header"><span className="badge">1</span><i className="material-icons">place</i>Second</div>
              <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
            </li>
          );
        case 'project_progress':
          return (
            <li>
              <div className="collapsible-header"><span className="badge">1</span><i className="material-icons">place</i>Second</div>
              <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
            </li>
          );
        default:
          throw new Error(`Unknown event type in newsfeed: ${item.type}`);
      }
    });


    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to EMPADA</h2>
        </div>
        <br />
        <InsertForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
        {count}
        <ReactInterval timeout={30000} enabled={true} callback={this.incrementCounter} />

        <ul className="collapsible popout" data-collapsible="accordion">
          {NewsFeed}
          <li>
            <div className="collapsible-header">
              <span className="new badge">4</span>
              <i className="material-icons">filter_drama</i>
              First
            </div>
            <div className="collapsible-body">
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
          </li>
          <li>
            <div className="collapsible-header"><span className="badge">1</span><i className="material-icons">place</i>Second</div>
            <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
          </li>
        </ul>

      </div>
    );
  }
}

export default App;
