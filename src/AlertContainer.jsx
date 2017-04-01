import React from 'react';
import AlertContainer from 'react-alert';
 
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.alertOptions = {
      offset: 14,
      position: 'bottom left',
      theme: 'dark',
      time: 5000,
      transition: 'scale'
    };
  }
 
  showAlert(){
    msg.error('You must begin a task before you can end it!', {
      offset: 14,
      position: 'bottom left',
      theme: 'dark',
      time: 5000,
      transition: 'scale'
    });
  }
 
  render(){
    return(
      <div>
        <AlertContainer ref={(a) => global.msg = a} {...this.alertOptions} />
        <button onClick={this.showAlert}>Show Alert</button>
      </div>
    );
  }
}