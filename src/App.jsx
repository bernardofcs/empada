import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import AuthModal from './components/AuthModal.jsx'
// import axios from 'axios'
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

  logout = () => {
    this.setState({profile: undefined})
    localStorage.removeItem("profile")
    // this.showLock()
  }

  componentWillMount = () => {
    console.log("componentWillMount <App />");    
    this.lock = new Auth0Lock('TejTiGWUQtFqn8hCNABYJ1KREwuDwyat', 'bfcsiqueira.auth0.com', {
      theme: {
        primaryColor: '#26e'
      },
      languageDictionary: {
        title: 'Authenticate'
      },
      closable: false,
      additionalSignUpFields: [{
        name: "given_name",
        placeholder: "Enter your first name",
        // icon: "https://example.com/name_icon.png",
        validator: (value) => {
          return value.length > 1
        }
      },{
        name: "family_name",
        placeholder: "Enter your last name",
        // icon: "https://example.com/name_icon.png",
        validator: (value) => {
          return value.length > 1
        }
      }]
    });

    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem("accessToken", authResult.accessToken);
      this.lock.getProfile(authResult.idToken, (err, profile) => {
        if (err) {
          console.log("Error loading the Profile", err);
          return;
        }
        localStorage.setItem("profile", JSON.stringify(profile));
        this.setState({profile: profile});
        this.handleLogin()
      });
    });
  }

  componentDidMount = () => {
    // console.log("componentDidMount <App />");
    setTimeout(() => {
      if(!localStorage.profile){
        this.showLock();
      }else{
        const storageProfile = JSON.parse(localStorage.profile)
        this.setState({profile: storageProfile})
      }
    }, 450)
    const mysocket = new WebSocket("ws://localhost:3001")
    this.socket = mysocket;
  }

  handleLogin = () => {
    console.log(this.state.profile.email)
    const loginObj = {type: 'auth0-login', email:this.state.profile.email, first_name: this.state.profile.given_name, last_name: this.state.profile.family_name}
    this.socket.send(JSON.stringify(loginObj))
  }

  // handleInputChange = (e) => {
  //   e.preventDefault();
  //   const objkey = e.target.name
  //   const stateobj = {}
  //   stateobj[objkey] = e.target.value
  //   this.setState(stateobj)
  // }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to EMPADA</h2>
        </div>
        <br />
        <div className="login-box">
          <button onClick={this.showLock}>Sign In</button>
          <button onClick={this.logout}>Log out</button>
          {this.state.profile && <p>Logged in as: {this.state.profile.email}</p>}
        </div>
        {/*<button onClick={this.openModal}>Login</button>*/}       
      </div>
    );
  }
}

export default App;

// <AuthModal handleLogin={this.handleLogin} handleRegister={this.handleRegister} handleInputChange={this.handleInputChange} modalIsOpen={this.state.modalIsOpen} afterOpenModal={this.afterOpenModal} 
//         closeModal={this.closeModal} contentLabel="" />
