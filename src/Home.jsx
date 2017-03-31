import React, { Component } from 'react';

class Home extends Component {



  render() {
    return (
      <div>
        <header>
          This is my website!
        </header>

        <main>
          {this.props.children}
        </main>

        <footer>
          Your copyright message
        </footer>
      </div>
    );
  }
}

export default Home;