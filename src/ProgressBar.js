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

/*class ProgressBar extends Component {
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
}*/