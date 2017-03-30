import React, {Component} from 'react';
import Login from './Login.jsx'
import Register from './Register.jsx'
import Modal from 'react-modal';

class AuthModal extends Component {
  constructor(props){
    super(props)
    this.state = {
      loginIsOpen: true,
      registerIsOpen: false
    }
  }
  openLogin = () => {
    this.setState({loginIsOpen: true}) 
    this.setState({registerIsOpen: false})
  }

  afterOpenLogin = () => {

  }

  openRegister = () => {
    this.setState({registerIsOpen: true}) 
    this.setState({loginIsOpen: false})
  }

  afterOpenRegister = () => {

  }

  render(){
    return (
      <Modal isOpen={this.props.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} contentLabel="">
        {this.state.loginIsOpen && <Login handleLogin={this.props.handleLogin} handleInputChange={this.props.handleInputChange} 
        openRegister={this.openRegister} afterOpenLogin={this.afterOpenLogin} />}
        {this.state.registerIsOpen && <Register handleRegister={this.props.handleRegister} handleInputChange={this.props.handleInputChange}
         openLogin={this.openLogin} afterOpenRegister={this.afterOpenRegister} />}  
        <br />
        <button onClick={this.props.closeModal}>Back to Main Page</button>      
      </Modal>
    );
  }
}

export default AuthModal;