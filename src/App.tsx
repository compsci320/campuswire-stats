import React from 'react';
import logo from './logo.svg';
import './App.css';
// import post_data from './mock/mock.json'
import {Post} from './models/Post'

function App() {
  let post_data: Post[] = require('./mock/mock.json');
  console.log(post_data[279].number);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          React App
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
