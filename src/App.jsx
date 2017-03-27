import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import AuthModal from './components/AuthModal.jsx'
import axios from 'axios'
import Auth0Lock from 'auth0-lock'

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

  showLock = () => {
    // Show the Auth0Lock widget
    this.lock.show();
  }

  componentWillMount = () => {
    this.lock = new Auth0Lock('TejTiGWUQtFqn8hCNABYJ1KREwuDwyat', 'bfcsiqueira.auth0.com');
    this.lock.on("authenticated", (authResult) => {
        console.log(authResult)
        this.setState({idToken: authResult.idToken})
          this.lock.getProfile(this.state.idToken, (err, profile) => {
            if (err) {
              console.log("Error loading the Profile", err);
              return;
            }
            this.setState({profile: profile});

        });
      });
  }
  componentDidMount = () => {
    // console.log("componentDidMount <App />");
    const http = axios.create({
      baseURL: 'https://localhost:3001',
      timeout: 1000,
      headers: {'X-Custom-Header': 'foobar'}
    });
    this.http = http;
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

  // handleInputChange = (e) => {
  //   e.preventDefault();
  //   const objkey = e.target.name
  //   const stateobj = {}
  //   stateobj[objkey] = e.target.value
  //   this.setState(stateobj)
  // }

  // handleLogin = (e) => {
  //   e.preventDefault();
  //   // console.log('login');
  //   // const loginObj = {type: 'login', email: this.state.login_email, password: this.state.login_password}
  //   // this.socket.send(JSON.stringify(loginObj))
  //   this.http.post('/user', {
  //     email: this.state.login_email,
  //     password: this.state.login_password
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }

  // handleRegister = (e) => {
  //   e.preventDefault();
  //   // console.log('registered');
  //   const registerObj = {type: 'register', first_name: this.state.register_firstname, last_name: this.state.register_lastname, email: this.state.register_email, 
  //   password: this.state.register_password}
  //   this.socket.send(JSON.stringify(registerObj))
  // }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to EMPADA</h2>
        </div>
        <br />
        <div className="login-box">
          <a onClick={this.showLock}>Sign In</a>
          <p></p>
        </div>
        {/*<button onClick={this.openModal}>Login</button>*/}       
      </div>
    );
  }
}

export default App;

// <AuthModal handleLogin={this.handleLogin} handleRegister={this.handleRegister} handleInputChange={this.handleInputChange} modalIsOpen={this.state.modalIsOpen} afterOpenModal={this.afterOpenModal} 
//         closeModal={this.closeModal} contentLabel="" />
