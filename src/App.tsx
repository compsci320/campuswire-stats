import React from 'react';
import './App.css';
import Router from './Router';
import Navbar from './components/navbar/navbar';
import { Post } from './models/Post';
import { createViewModel } from './service/EngagementService';

function App() {
  let post_data: Post[] = require('./mock/mock.json');
  // let viewModel = createViewModel(post_data);
  // console.log(viewModel);


  
  return (
    <div className="app">
      <Navbar />
      <Router />  
    </div>  
  );
}

export default App;
