import React, { Component } from 'react';
import { Row, Col, Footer } from 'react-materialize';
import '../styles/App.css';

class Footerr extends Component {
  render() {
    return (
      <Footer copyrights="&copy; 2015 Copyright Text"
        moreLinks={
          <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
        }
        links={
          <Row>
            <Col s={3}><a className="grey-text text-lighten-3" href="#!">Link 1</a></Col>
            <Col s={3}><a className="grey-text text-lighten-3" href="#!">Link 2</a></Col>
            <Col s={3}><a className="grey-text text-lighten-3" href="#!">Link 3</a></Col>
            <Col s={3}><a className="grey-text text-lighten-3" href="#!">Link 4</a></Col>
          </Row>
        }
        className='example'
      >
          <h5 className="white-text">Footer Content</h5>
          <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
      </Footer>
    );
  }
}

export default Footerr;
