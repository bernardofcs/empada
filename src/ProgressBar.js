import React, { Component } from 'react';
import { Row } from 'react-materialize';
import ProgressBarFields from './ProgressBarFields.jsx'
import '../styles/App.css'

// make the donus smaller

class ProgressBar extends Component {
  render() {
    return (
      <Row className='progress-donut-container card-panel'>
        {
          this.props.progressBar.map((field, i) => {
            return <ProgressBarFields
              field={field}
              key={i}
            />
          })
        }
      </Row>
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