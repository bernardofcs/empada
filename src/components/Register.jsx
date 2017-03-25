import React, {Component} from 'react';

class Register extends Component {

  render(){
    return (
      <form action="/" onSubmit={this.props.handleRegister}>
        <h2>Sign Up</h2><br />
        First Name
        <input type="text" name="register-firstname" onChange={this.props.handleInputChange} /><br />
        Last Name
        <input type="text" name="register-lastname" onChange={this.props.handleInputChange} /><br />
        Email
        <input type="email" name="register-email" onChange={this.props.handleInputChange} /><br />
        Password
        <input type="password" name="register-password" onChange={this.props.handleInputChange} /><br />
        <button type="submit" label="Login">Create Account</button><br />
        <button onClick={this.props.openLogin}>Already Registered?</button>
      </form>
    );
  }
}

export default Register