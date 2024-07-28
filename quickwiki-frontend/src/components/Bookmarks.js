// Bookmark Component Implmentation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { Alert, Box, Button, Card, CardContent, CardMedia, Typography, } from '@mui/material';


// Components & Necessary Files 
import apiClient from '../api/apiClient';


// Bookmark Component 
function Bookmark() {

    const [ bookmarks, setBookmarks ] = useState([]);


    return(
        <div 
            className = 'bookmark-container'
        >
            
        </div>
    )
}

export default Bookmark;