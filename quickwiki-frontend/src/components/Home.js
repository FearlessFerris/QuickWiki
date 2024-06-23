// Home Component Implementation 


// Dependencies 
import React, { useState } from 'react';
import { Alert, Box, Button, TextField } from '@mui/material';

// Components & Necessary Files 
import SearchBar from './SearchBar';
import '../static/Home.css';


// Home Component 
function Home() {

    const [ alerts, setAlerts ] = useState({});

    useEffect( () => {
        
    })
    return( 
        <div className = 'home-container'> 
            <div className = 'centered'>
                <SearchBar />
            </div>
        </div>
    )
}

export default Home;