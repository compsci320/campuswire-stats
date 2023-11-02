import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import Router from './Router';
import Navbar from './components/navbar/navbar';
import {Post} from './models/Post';

function App() {
  let post_data: Post[] = require('./mock/mock.json');
  console.log(post_data[279].number);
  
  return (
    <div className="app">
      <Navbar />
      <RouterProvider router={Router} />  
    </div>  
  );
}

export default App;
