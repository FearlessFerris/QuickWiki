// Bookmark Component Implementation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { Alert, Box, Button, Card, CardContent, CardMedia, CircularProgress, Typography, } from '@mui/material';


// Components & Necessary Files 
import apiClient from '../api/apiClient';


// Bookmark Component 
function Bookmark() {

    const [ bookmarks, setBookmarks ] = useState([]);
    
    return(
        <div 
            className = 'bookmark-container'
        >
            <h1> Bookmark Component </h1>
        </div>
    )
}

export default Bookmark;