import React, { Component } from 'react';
import { Col } from 'react-materialize';
import { PieChart } from 'react-chartkick';
import '../styles/App.css'

// changing to donut graph

class ProgressBarFields extends Component {
  render() {
    return (
      <div>
        <Col s={1.5} className="progress-donut-chart">
          <p className="pie-chart-name">{this.props.field.name}</p>
          <PieChart data={[
              ['Completed Tasks', this.props.field.completed_tasks],
              ['Incomplete Tasks', this.props.field.incomplete_tasks]]}
            max={100}
            donut={true}
            stacked={true}
            legend={false}
            width={"6em"}
            height={"6em"}
          />
        </Col>
      </div>
    );
  }
}

export default ProgressBarFields;
