import React, { Component } from 'react';

class Nav extends Component {
  render(){
    return(
    <div>
      <button onClick={this.props.displayEventCreationFormPage}>Create Event Form</button>      
      <button onClick={this.props.displayDashboardPage}>Dashboard</button>      
      <button onClick={this.props.displayNewsFeedPage}>News Feed</button>      
    </div>
    ) 
  }
}

export default Nav;