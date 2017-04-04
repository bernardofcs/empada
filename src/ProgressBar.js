import React, { Component } from 'react';
import { Row } from 'react-materialize';
import ProgressBarFields from './ProgressBarFields.jsx'
import '../styles/App.css'


class ProgressBar extends Component {
  debugger;
  render() {
    return (
      <Row className='progress-donut-container'>
        { 
          this.props.progressBar.filter(({projectId}) => {
            // debugger;
            // console.log(this.props.selectedProject.id)
            return projectId === this.props.selectedProject.id
          })
          .map((field, i) => {
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
