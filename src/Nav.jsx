import React, { Component } from 'react';

class Nav extends Component {
  render(){
    return(
    <div>
      <button onClick={this.props.displayProjectSelectionPage}>Select Project</button>
      <button onClick={this.props.displayEventCreationFormPage}>Create Project Form</button>      
      <button onClick={this.props.displayDashboardPage}>Dashboard</button>  
      <button onClick={this.props.displayHomePage}>Home</button>     
    </div>
    ) 
  }
}

export default Nav;