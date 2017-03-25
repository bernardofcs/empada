import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class AuthModal extends Component {

  render(){
    return (
      <div>
        <h2 ref="subtitle">Sign Up</h2>
        <button onClick={this.closeModal}>close</button>
        <div>Please login to your account.</div>
        <form>
          <input />
        </form>
      </div>
    );
  }
}