import React from 'react';
import './App.css';
import Router from './Router';
import Navbar from './components/navbar/navbar';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Router />  
    </div>  
  );
}

export default App;
