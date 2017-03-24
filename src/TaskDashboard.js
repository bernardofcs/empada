import React, { Component } from 'react';
import { Button, Card, Row, Col } from 'react-materialize';
// only keep what you want to use 
// use radio button separately in each form, can't press the end button until the first button has been clicked

class TaskDashboard extends Component {
  render() {
    return (
      <section>
        <header>List of Tasks</header>

        <div>Start
          <form onSubmit={this.props.handleStartTask}>
            <Button name='group1' type='radio' value='green' label='Green' className='with-gap'></Button>
          </form>
        </div>

        <div>End
          <form onSubmit={this.props.handleEndTask}>
            <Button name='group1' type='radio' value='brown' label='Brown' disabled='disabled'></Button>
          </form>
        </div>
      </section>
    );
  }
}

export default InsertForm;