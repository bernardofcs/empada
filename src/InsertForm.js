import React, { Component } from 'react';
import { Row } from 'react-materialize';
import './App.css';

class InsertForm extends Component {
  render() {
    return (
      <Row>
        <form onSubmit={this.props.handleSubmit}>
          <input type="text" onChange={this.props.handleChange} placeholder="Insert something here" ref="insert" />
          <input type="submit"/>
        </form>
      </Row>
    );
  }
}

export default InsertForm;