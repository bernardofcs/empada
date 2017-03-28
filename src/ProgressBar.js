import React, { Component } from 'react';
// import { Button } from 'react-materialize';
import { BarChart } from 'react-chartkick';
import ProgressBarFields from './ProgressBarFields.jsx'
import '../styles/App.css'

class ProgressBar extends Component {
  render() {
    return (
      <div className='timeline-container'>
        { 
          this.props.progressBar.map((field, i) => {
            return <ProgressBarFields 
              field={field}
              key={i}
            />
          })
        }
        </div>
    );
  }
}

export default ProgressBar;

// replace the names of the files with the tasks.name and the values with 100 and 0 respectively. Then, after each task has been completed, divide that single task completion by the number of total tasks for that tasks.name, multiple by 100 and subtract it from the first value and add it to the second