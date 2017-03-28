import React, { Component } from 'react';
// import { Button } from 'react-materialize';
import { BarChart } from 'react-chartkick';
import '../styles/App.css'

// changing to donut graph

class ProgressBarFields extends Component {
  render() {
    return (
      <BarChart data={[
        {
          name: "Completed Tasks", 
          data: [
            [this.props.field.user_id, this.props.field.completed_tasks], 
            [4, 50]]
        },
        {
          name: "Incomplete Tasks", 
          data: [
            [this.props.field.user_id, this.props.field.incomplete_tasks], 
            [4, 50]]
        }]}
        max={100}
        stacked={true}
      />
    );
  }
}

export default ProgressBarFields;
