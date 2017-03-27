import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import InsertForm from './InsertForm.js'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log('submitted')
   console.log(this.state.insert)
  }

  handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value)
    this.setState({insert: e.target.value})
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to EMPADA</h2>
        </div>
        <br />
        <InsertForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default App;
