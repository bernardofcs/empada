import React, { Component } from 'react';
import { Timeline } from 'react-chartkick';
import '../styles/App.css';


class DashboardTimeline extends Component {

  render() {
    let libraryData = {timeline: {groupByRowLabel: true}};
    console.log('this.props.tasks:');
    console.log(this.props.tasks);

    return (
      <div className='dashboardTimeline card-panel'>
        <Timeline data={this.props.tasks} library={libraryData} />
      </div>
    );
  }
}

export default DashboardTimeline;