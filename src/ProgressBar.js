import React, { Component } from 'react';
import { Row } from 'react-materialize';
import ProgressBarFields from './ProgressBarFields.jsx'
import '../styles/App.css'


class ProgressBar extends Component {
  debugger;
  render() {
    return (
      <Row className='progress-donut-container card-panel'>
        <div className="card-move-up card z-depth-0 light-blue lighten-2">
          <span className="card-title white-text">Progress</span>
        </div>
        {
          this.props.progressBar.filter(({projectId}) => projectId === this.props.selectedProject.id)
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
