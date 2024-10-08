// QuickWiki Frontend Application Component 


// Dependencies 
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';


// Components & Necessary Files 
import AlertComponent from './Alert';
import Bookmark from './Bookmark';
import BookmarkGroup from './BookmarkGroup';
import CreateUserForm from './CreateUser';
import Home from './Home';
import Login from './Login';
import Navbar from './Navbar';
import Page from './Page';
import PrivateRoute from './PrivateRoute';
import Profile from './Profile';
import '../static/App.css';


// Context Providers 
import { AlertProvider } from './ContextDirectory.js/AlertContext';
import { LoggedInProvider } from './ContextDirectory.js/LoggedInContext';


// QuickWiki Component 
function App() {
  return (
    <AlertProvider>
    <LoggedInProvider>
    <div className = "App">
      <Router>
      <Navbar /> 
        <Routes>
          <Route exact path = '/' element = { <Home /> } />
          <Route exact path = '/user/create' element = { <CreateUserForm /> } />
          <Route exact path = '/user/profile' element = { <PrivateRoute component = { Profile } /> } />  
          <Route exact path = '/user/bookmark' element = { <PrivateRoute component = { Bookmark } /> } /> 
          <Route exact path = '/user/bookmark/group/:groupId' element = { <PrivateRoute component = { BookmarkGroup } /> } /> 
          <Route exact path = '/user/login' element = { <Login /> } /> 
          <Route exact path = '/search/page/:title' element = { <Page /> } /> 
        </Routes>
      </Router>
      <AlertComponent /> 
    </div>
    </LoggedInProvider>
    </AlertProvider>
  );
}

export default App;
