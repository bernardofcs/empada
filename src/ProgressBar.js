import React, { Component } from 'react';
// import { Button } from 'react-materialize';
import { BarChart } from 'react-chartkick';
import '../styles/App.css'

class ProgressBar extends Component {
  render() {
    return (
      <div className='timeline-container'>
        <BarChart data={[{
            name: "Completed Tasks", 
            data: [["Photography", 50], ["Catering", 20]]
          },
          {
            name: "Uncompleted Tasks", 
            data: [["Photography", 50], ["Catering", 80]]
          }]}
          max={100}
          stacked={true}/>
      </div>
    );
  }
}

export default ProgressBar;