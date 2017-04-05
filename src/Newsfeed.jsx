import React, { Component } from 'react';
import ReactInterval from 'react-interval';
import '../styles/App.css';


class Newsfeed extends Component {

  // renderNewsfeed = (data) => {
  //   // this.setState({ allTasks: data });

  //   // let fromDb = [
  //   //   {
  //   //     type:   'assigned_user_action',
  //   //     user:   'assigned_user',
  //   //     task:   'assigned_task',
  //   //     action: 'started_task', //'completed_task', 'progress_bar'
  //   //     action_time: new Date(2016, 11, 1, 9),
  //   //     assigned_time: new Date(2016, 11, 1, 9),
  //   //     notification_time: new Date(2016, 11, 1, 9)
  //   //   },
  //   //   {
  //   //     type:   'assigned_user_action',
  //   //     user:   'assigned_user',
  //   //     task:   'assigned_task',
  //   //     action: 'completed_task',
  //   //     action_time: new Date(2016, 11, 1, 9, 10),
  //   //     assigned_time: new Date(2016, 11, 1, 9, 0),
  //   //     notification_time: new Date(2016, 11, 1, 9, 10)
  //   //   },
  //   //   {
  //   //     type:   'assigned_user_action',
  //   //     user:   'assigned_user',
  //   //     task:   'assigned_task',
  //   //     action: 'started_task', //'completed_task', 'progress_bar'
  //   //     action_time: new Date(2016, 11, 1, 9, 1),
  //   //     assigned_time: new Date(2016, 11, 1, 9, 10),
  //   //     notification_time: new Date(2016, 11, 1, 9, 10)
  //   //   },
  //   //   {
  //   //     type:   'task_timing',
  //   //     user:   'assigned_user',
  //   //     task:   'assigned_task',
  //   //     action: 'task_not_started', //'task_not_completed'
  //   //     assigned_time: new Date(2016, 11, 1, 9, 10),
  //   //     notification_time: new Date(2016, 11, 1, 9, 15)
  //   //   },
  //   //   {
  //   //     type:   'task_timing',
  //   //     user:   'assigned_user',
  //   //     task:   'assigned_task',
  //   //     action: 'task_not_completed',
  //   //     assigned_time: new Date(2016, 11, 1, 9, 10),
  //   //     notification_time: new Date(2016, 11, 1, 9)
  //   //   },
  //   //   {
  //   //     type:   'project_progress',
  //   //     action: 'percent_completed', //'percent_expected' eg.Should be 50% at this point
  //   //     percantage: '50',
  //   //     notification_time: new Date(2016, 11, 1, 10)
  //   //   },
  //   //   {
  //   //     type:   'project_progress',
  //   //     action: 'percent_expected',
  //   //     percantage: '50',
  //   //     notification_time: new Date(2016, 11, 1, 10)
  //   //   }
  //   // ]

  //   const newsfeed = [];
  //   for (let item of this.state.allTasks) {
  //     item.assigned_start_time = item.assigned_start_time ? new Date(item.assigned_start_time) : null;
  //     item.assigned_end_time = item.assigned_end_time ? new Date(item.assigned_end_time) : null;
  //     item.start_time = item.start_time ? new Date(item.start_time) : null;
  //     item.end_time = item.end_time ? new Date(item.end_time) : null;

  //     if (item.start_time) {
  //       newsfeed.push({
  //         type:   'assigned_user_action',
  //         user:   item.user.first_name,
  //         task:   item.name,
  //         action: 'started_task',
  //         action_time: item.start_time,
  //         assigned_time: item.assigned_start_time,
  //         notification_time: item.start_time
  //       })
  //     }

  //     if (item.end_time) {
  //       newsfeed.push({
  //         type:   'assigned_user_action',
  //         user:   item.user.first_name,
  //         task:   item.name,
  //         action: 'completed_task',
  //         action_time: item.end_time,
  //         assigned_time: item.assigned_end_time,
  //         notification_time: item.end_time
  //       })
  //     }

  //     if (new Date(item.assigned_start_time.getTime() + this.state.grace_period) < item.start_time
  //       || (
  //         (new Date() - item.assigned_start_time > this.state.grace_period)
  //         && !(item.start_time)
  //         )
  //       ) {
  //       newsfeed.push({
  //         type:   'task_timing',
  //         user:   item.user.first_name,
  //         task:   item.name,
  //         action: 'task_not_started', //'task_not_completed'
  //         assigned_time: item.assigned_start_time,
  //         notification_time: item.assigned_start_time + this.state.grace_period
  //       })
  //     }

  //     if (new Date(item.assigned_end_time.getTime() + this.state.grace_period) < item.end_time
  //       || (
  //         (new Date() - item.assigned_end_time > this.state.grace_period)
  //         && !(item.end_time)
  //         )
  //       ) {
  //       newsfeed.push({
  //         type:   'task_timing',
  //         user:   item.user.first_name,
  //         task:   item.name,
  //         action: 'task_not_completed',
  //         assigned_time: item.assigned_end_time,
  //         notification_time: item.assigned_end_time + this.state.grace_period
  //       })
  //     }
  //   };

  //   newsfeed.sort((a, b) => {
  //     return new Date(a.notification_time).getTime() < new Date(b.notification_time).getTime();
  //   })

  //   // const newsfeed = fromDb.map((item, index) => {
  //   this.setState({
  //     newsfeed: newsfeed.map((item, index) => {
  //       let notif_type = [];
  //       switch(item.type) {
  //         case 'assigned_user_action':
  //           if (item.action === 'started_task') {
  //             notif_type = ['Started', 'start'];
  //           } else if (item.action === 'completed_task') {
  //             notif_type = ['Completed', 'completion'];
  //           }

  //           if (item.action_time > item.assigned_time
  //             && (item.action_time - item.assigned_time) > this.state.grace_period) { //difference of less than 5 minutes gets no notification
  //             notif_type.push('red','late', 'thumb_down');
  //           } else if (item.action_time < item.assigned_time
  //             && (item.assigned_time - item.action_time) > this.state.grace_period) {
  //             notif_type.push('green','early', 'thumb_up');
  //           } else {
  //             notif_type.push('blue','on time', 'alarm_on'); // alternative icon: 'schedule'
  //           }

  //           return (

  //             <div className="card">
  //               <div className="card-content activator">
  //                 <span className={`new badge ${notif_type[2]} activator`} data-badge-caption={`${notif_type[3]}`}></span>
  //                 <i className="material-icons activator">{`${notif_type[4]}`}</i>
  //                 <p className="activator">{`${item.user} has ${notif_type[0].toLowerCase()} ${item.task}`}</p>
  //               </div>
  //               <div className="card-reveal">
  //                 <span className="card-title"><i className="material-icons right">close</i></span>
  //                 <dl>
  //                   <dt><b>Task:</b> {item.task}</dt>
  //                   <dt><b>{`${notif_type[0]}`} at:</b> {`${item.action_time}`}</dt>
  //                   <dt><b>Expected {`${notif_type[1]}`} time:</b> {`${item.assigned_time}`}</dt>
  //                 </dl>
  //               </div>
  //             </div>

  //             <li>
  //               <div className="collapsible-header">
  //                 <span className={`new badge ${notif_type[2]}`} data-badge-caption={`${notif_type[3]}`}></span>
  //                 <i className="material-icons">{`${notif_type[4]}`}</i>
  //                 <p>{`${item.user} has ${notif_type[0].toLowerCase()} ${item.task}`}</p>
  //               </div>
  //               <div className="collapsible-body left-align">
  //                 <dl>
  //                   <dt><b>Task:</b> {item.task}</dt>
  //                   <dt><b>{`${notif_type[0]}`} at:</b> {`${item.action_time}`}</dt>
  //                   <dt><b>Expected {`${notif_type[1]}`} time:</b> {`${item.assigned_time}`}</dt>
  //                 </dl>
  //               </div>
  //             </li>
  //           );

  //         case 'task_timing':
  //           if (item.action === 'task_not_started') {
  //             notif_type = ['Started', 'start'];
  //           } else if (item.action === 'task_not_completed') {
  //             notif_type = ['Completed', 'completion'];
  //           }
  //           notif_type.push('late', 'thumb_down');

  //           return (
  //             <li>
  //               <div className="collapsible-header">
  //                 <span className="new badge red" data-badge-caption={`${notif_type[2]}`}></span>
  //                 <i className="material-icons">{`${notif_type[3]}`}</i>
  //                 <p>{`${item.user} has not ${notif_type[0].toLowerCase()} ${item.task}`}</p>
  //               </div>
  //               <div className="collapsible-body left-align">
  //                 <dl>
  //                   <dt><b>Task:</b> {item.task}</dt>
  //                   <dt><b>Expected {`${notif_type[1]}`} time:</b> {`${item.assigned_time}`}</dt>
  //                 </dl>
  //               </div>
  //             </li>
  //           );

  //         case 'project_progress':
  //           notif_type = [];
  //           if (item.action === 'percent_completed') {
  //             notif_type.push('', 'blue', 'on time', 'alarm_on');
  //           } else if (item.action === 'percent_expected') {
  //             notif_type.push('expected to be ', 'red', 'late', 'thumb_down');
  //           }

  //           return (
  //             <li>
  //               <div className="collapsible-header">
  //                 <span className={`new badge ${notif_type[1]}`} data-badge-caption={`${notif_type[2]}`}></span>
  //                 <i className="material-icons">{`${notif_type[3]}`}</i>
  //                 <p>{`${item.percent} of project ${notif_type[0]}complete.`}</p>
  //               </div>
  //             </li>
  //           );

  //         default:
  //           throw new Error(`Unknown event type in newsfeed: ${item.type}`);
  //       }
  //     })
  //   })

  // }
  // <ul className="collapsible popout" data-collapsible="accordion"></ul>

  render() {
    return (
      <div className='newsfeed card-panel'>
        <div className="card-move-up card z-depth-0 light-blue lighten-2">
          <span className="card-title white-text">Newsfeed</span>
        </div>
        <ReactInterval timeout={5000} enabled={true} callback={this.props.updateNewsfeed} />

        <div className="notifications">
          {this.props.newsfeed}
        </div>
      </div>
    );
  }
}

export default Newsfeed;