import React, { Component } from 'react';
import { Timeline } from 'react-chartkick';
import '../styles/App.css';


class DashboardTimeline extends Component {

  render() {
    let libraryData = {timeline: {groupByRowLabel: true}};
    // console.log('this.props.tasks:');
    // console.log(this.props.tasks);

    return (
      <div>
        <div className="card-move-up card z-depth-0 light-blue lighten-2">
          <span className="card-title white-text">Live Timeline</span>
        </div>
        <div className='card-panel dashboardTimeline'>
          <Timeline data={this.props.tasks} library={libraryData} />
        </div>
      </div>
    );
  }
}

export default DashboardTimeline;