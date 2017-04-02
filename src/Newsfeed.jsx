import React, { Component } from 'react';
import ReactInterval from 'react-interval';
import '../styles/App.css';


class Newsfeed extends Component {


  render() {
    return (
      <div className='newsfeed'>
        <ReactInterval timeout={5000} enabled={true} callback={this.props.updateNewsfeed} />

        <ul className="collapsible popout" data-collapsible="accordion">
          {this.props.newsfeed}
          {/*this.props.renderNewsfeed*/}
        </ul>
      </div>
    );
  }
}

export default Newsfeed;