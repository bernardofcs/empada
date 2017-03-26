import React, { Component } from 'react';
// import { Button } from 'react-materialize';
import { Timeline } from 'react-chartkick';
import '../styles/App.css'

class ProgressBar extends Component {
  render() {
    return (
      <div className='timeline-container'>
        <Timeline data={[["Washington", "1789-04-29", "1797-03-03"],["Adams", "1797-03-03", "1801-03-03"]]} />
      </div>
    );
  }
}

export default ProgressBar;