// QuickWiki Frontend Application Component 


// Dependencies 
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';


// Components & Necessary Files 
import Home from './Home';
import CreateUserForm from './CreateUser';
import Login from './Login';
import Navbar from './Navbar';
import '../static/App.css';


// QuickWiki Component 
function App() {
  return (
    <div className = "App">
      <Router>
      <Navbar /> 
        <Routes>
          <Route exact path = '/' element = { <Home /> } />
          <Route exact path = '/user/create' element = { <CreateUserForm /> } /> 
          <Route exact path = '/user/login' element = { <Login /> } /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
