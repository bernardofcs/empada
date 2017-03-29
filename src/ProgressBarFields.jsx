import React, { Component } from 'react';
import { Col } from 'react-materialize';
import { PieChart } from 'react-chartkick';
import '../styles/App.css'

// changing to donut graph

class ProgressBarFields extends Component {
  render() {
    return (
      <Col s={1.5}>
        <p className="pie-chart-name">{this.props.field.user_id}</p>
        <PieChart data={[
            ['Completed Tasks', this.props.field.completed_tasks],
            ['Incomplete Tasks', this.props.field.incomplete_tasks]]}
          max={100}
          donut={true}
          stacked={true}
          legend={false}
          width={"12em"}
          height={"12em"}
        />
      </Col>
    );
  }
}

export default ProgressBarFields;
