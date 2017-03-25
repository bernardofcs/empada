import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import InsertForm from './InsertForm.js'
import AuthModal from './components/AuthModal.jsx'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalIsOpen: false
    };

    // this.openModal = this.openModal.bind(this);
    // this.afterOpenModal = this.afterOpenModal.bind(this);
    // this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount = () => {
    // console.log("componentDidMount <App />");
    const mysocket = new WebSocket("ws://localhost:3001")
    this.socket = mysocket;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log('submitted')
   console.log(this.state.insert)
   this.socket.send(this.state.insert)
  }

  handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value)
    this.setState({insert: e.target.value})
  }

  openModal = () => {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // this.refs.subtitle.style.color = '#013';
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
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
        <button onClick={this.openModal}>Open Modal</button>
        <AuthModal modalIsOpen={this.state.modalIsOpen} afterOpenModal={this.afterOpenModal} closeModal={this.closeModal} contentLabel="" />
      </div>
    );
  }
}

export default App;
