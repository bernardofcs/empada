import React, {Component} from 'react';

class Register extends Component {

  render(){
    return (
      <form action="/" onSubmit={this.props.handleRegister}>
        <h2>Sign Up</h2><br />
        First Name
        <input type="text" name="register_firstname" onChange={this.props.handleInputChange} /><br />
        Last Name
        <input type="text" name="register_lastname" onChange={this.props.handleInputChange} /><br />
        Email
        <input type="email" name="register_email" onChange={this.props.handleInputChange} /><br />
        Password
        <input type="password" name="register_password" onChange={this.props.handleInputChange} /><br />
        <button type="submit" label="Login">Create Account</button><br />
        <button onClick={this.props.openLogin}>Already Registered?</button>
      </form>
    );
  }
}

export default Register