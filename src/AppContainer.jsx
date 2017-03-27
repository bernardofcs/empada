import React, { Component } from 'react'
// import Auth0Lock from 'auth0-lock'
import App from './App.jsx'

class AppContainer extends Component {
  // ...
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return (<App lock={this.lock} idToken={this.state.idToken} />);
  }
}

export default AppContainer;