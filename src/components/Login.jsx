import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Login extends Component {

  render(){
    return (
      <div>
        <h2 ref="subtitle">Sign In</h2>
        <div>Please login to your account.</div>
        <form>
          <input />
        </form>
      </div>
    );
  }
}

export default Login