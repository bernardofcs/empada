import React, { Component } from 'react';
import { Timeline } from 'react-chartkick';
import '../styles/App.css';


class DashboardTimeline extends Component {

  render() {
    // const timing = ['early start', 'late start', 'as scheduled', 'completed early', 'completed late'];
    // let sample_data = [
    //   ["Ammar", new Date(2016, 11, 1, 8,  1), new Date(2016, 11, 1, 8, 30), timing[0], '#a23c7a'],
    //   ["Ammar", new Date(2016, 11, 1, 8, 30), new Date(2016, 11, 1, 9,  1), timing[2], '#40a67d'],
    //   ["Ammar", new Date(2016, 11, 1, 9,  1), new Date(2016, 11, 1, 9, 30), timing[3], '#5581b4']
    // ];
    let libraryData = {timeline: {groupByRowLabel: true}};
    console.log('this.props.tasks:');
    console.log(this.props.tasks);

    return (
      <div className='dashboardTimeline'>
        {/*<Timeline data={sample_data} library={libraryData} />*/}
        <Timeline data={this.props.tasks} library={libraryData} />
      </div>
    );
  }
}

export default DashboardTimeline;