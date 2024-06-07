// QuickWiki Frontend Application Component 


// Dependencies 
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';


// Components & Necessary Files 
import Home from './Home';
import Navbar from './Navbar';
import '../static/App.css';


// QuickWiki Component 
function App() {
  return (
    <div className = "App">
      <div className = 'title'>
        <Navbar /> 
        <h1> Welcome to QuickWiki </h1>
      </div>
      <Router>
        <Routes>
          <Route exact path = '/' element = { <Home /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
