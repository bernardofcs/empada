import React, { Component } from 'react';
import './App.css';

class InsertForm extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <input type="text" onChange={this.props.handleChange} placeholder="Insert something here" ref="insert" />
          <input type="submit"/>
        </form>
      </div>
    );
  }
}

export default InsertForm;