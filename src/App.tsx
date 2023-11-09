import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import Router from './Router';
import {Post} from './models/Post';

function App() {
  let post_data: Post[] = require('./mock/mock.json');
  // let viewModel = createViewModel(post_data);
  // console.log(viewModel);


  
  return (
    <RouterProvider router={Router} />    
  );
}

export default App;
