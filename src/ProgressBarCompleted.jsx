import React, { Component } from 'react';
// import { Button } from 'react-materialize';
import '../styles/App.css'

class ProgressBarCompleted extends Component {
  render() {
    return (
      [
        [this.props.completedTask.name,
        this.props.completedTask.incomplete_tasks], 
      ]
    );
  }
}

export default ProgressBarCompleted;
