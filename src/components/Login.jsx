import React, {Component} from 'react';

class Login extends Component {

  render(){
    return (
      <form action="/" onSubmit={this.props.handleLogin} >
        <h2>Sign In</h2><br />
        <input type="email" name="login-email" onChange={this.props.handleInputChange} /><br />
        <input type="password" name="login-password" onChange={this.props.handleInputChange}/><br />
        <button type="submit" label="Login">Login</button><br />
        <button onClick={this.props.openRegister}>Don't have an account yet?</button>
      </form>
    );
  }
}
export default Login