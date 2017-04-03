import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../styles/index.css';
// import { Route, BrowserRouter as Router } from 'react-router-dom'


const app = document.getElementById('root')


// const Container = (props) => <div>
//   <Nav />
//   {props.children}
// </div>

ReactDOM.render( 
  <App />,
  app
);