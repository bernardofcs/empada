import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../styles/index.css';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom'
import EventCreationForm from './EventCreationForm.jsx';


const app = document.getElementById('root')


// const Container = (props) => <div>
//   <Nav />
//   {props.children}
// </div>

ReactDOM.render( 
  <Router>
    <div> 
      <Route exact path='/' component={App} />
    </div>
  </Router>,
  app
);