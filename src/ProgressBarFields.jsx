import React, { Component } from 'react';
// import { Button } from 'react-materialize';
import { BarChart } from 'react-chartkick';
import '../styles/App.css'

class ProgressBarFields extends Component {
  render() {
    return (
      <BarChart data={[
        {
          name: "Completed Tasks", 
          data: [
            [this.props.field.user_id, this.props.field.completed_tasks]]
        },
        {
          name: "Incomplete Tasks", 
          data: [
            [this.props.field.user_id, this.props.field.incomplete_tasks]]
        }]}
        max={100}
        stacked={true}
      />
    );
  }
}

export default ProgressBarFields;
