import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
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

  handleInputChange = (e) => {
    e.preventDefault();
    const objkey = e.target.name
    const stateobj = {}
    stateobj[objkey] = e.target.value
    this.setState(stateobj)
  }

  handleLogin = (e) => {
    e.preventDefault();
    // console.log('login');
    const loginObj = {type: 'login', email: this.state.login_email, password: this.state.login_password}
    this.socket.send(JSON.stringify(loginObj))
  }

  handleRegister = (e) => {
    e.preventDefault();
    // console.log('registered');
    const registerObj = {type: 'register', firstname: this.state.register_firstname, lastname: this.state.register_lastname, email: this.state.register_email,
    password: this.state.password}
    this.socket.send(JSON.stringify(registerObj))
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to EMPADA</h2>
        </div>
        <br />
        <button onClick={this.openModal}>Login</button>
        <AuthModal handleLogin={this.handleLogin} handleRegister={this.handleRegister} handleInputChange={this.handleInputChange} modalIsOpen={this.state.modalIsOpen} afterOpenModal={this.afterOpenModal} 
        closeModal={this.closeModal} contentLabel="" />
      </div>
    );
  }
}

export default App;
