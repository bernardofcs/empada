import React, { Component } from 'react';
// import { Button } from 'react-materialize';
import { PieChart } from 'react-chartkick';
import '../styles/App.css'

// changing to donut graph

class ProgressBarFields extends Component {
  render() {
    return (
      <div>
        <p>{this.props.field.user_id}</p>
        <PieChart data={[
            ['Completed Tasks', this.props.field.completed_tasks],
            ['Incomplete Tasks', this.props.field.incomplete_tasks]]}
          max={100}
          donut={true}
          stacked={true}
        />
      </div>
    );
  }
}

export default ProgressBarFields;
