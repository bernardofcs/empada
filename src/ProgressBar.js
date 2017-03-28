import React, { Component } from 'react';
// import { Button } from 'react-materialize';
import { PieChart } from 'react-chartkick';
import ProgressBarFields from './ProgressBarFields.jsx'
import '../styles/App.css'

// make the donus smaller

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