import React, {Component} from 'react';
import ReactDOM from 'react-dom';
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
  }

  afterOpenLogin = () => {

  }

  closeLogin = () => {
    this.setState({loginIsOpen: false})
  }

  openRegister = () => {
    this.setState({registerIsOpen: true}) 
  }

  afterOpenRegister = () => {

  }

  closeRegister = () => {
    this.setState({registerIsOpen: false})
  }

  render(){
    return (
      <Modal isOpen={this.props.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} contentLabel="">
        {this.state.loginIsOpen && <Login />}
        {this.state.registerIsOpen && <Register />}  
        <br />
        <button onClick={this.props.closeModal}>close</button>      
      </Modal>
    );
  }
}

export default AuthModal;