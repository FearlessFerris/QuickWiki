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
import AlertComponent from './Alert';
import '../static/App.css';


// Context Providers 
import { AlertProvider } from './ContextDirectory.js/AlertContext';


// QuickWiki Component 
function App() {
  return (
    <AlertProvider>
    <div className = "App">
      <Router>
      <Navbar /> 
        <Routes>
          <Route exact path = '/' element = { <Home /> } />
          <Route exact path = '/user/create' element = { <CreateUserForm /> } /> 
          <Route exact path = '/user/login' element = { <Login /> } /> 
        </Routes>
      </Router>
      <AlertComponent /> 
    </div>
    </AlertProvider>
  );
}

export default App;
