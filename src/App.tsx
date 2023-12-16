import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import Router from './Router';

function App() {
  // Router for the pages in the web application
  return (
    <RouterProvider router={Router} />
  );
}

export default App;
