import React, { Component } from 'react';
// import { Button } from 'react-materialize';
import '../styles/App.css'

class ProgressBarIncomplete extends Component {
  render() {
    return (
      [
        [this.props.incompleteTask.name,
        this.props.incompleteTask.incomplete_tasks], 
      ]
    );
  }
}

export default ProgressBarIncomplete;
