// Profile Component Implementation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Box, Button, Input, TextField, PasswordField, Typography } from '@mui/material';


// Components & Necessary Files 
import apiClient from '../api/apiClient';


// Profile Component 
function Profile() {

    const [ profile, setProfile ] = useState({});

    useEffect( () => {
        const fetchProfile = async () => {
            try{
                const response = await apiClient.get( '/profile' );
                console.log( response );
            }
            catch( error ){
                console.error( 'Error fetching user profile' );
            }
        }
        
        fetchProfile();
    }, []);

    return(
        <div
            className = 'profile-container'
        > 
            <form
                style = {{
                    backgroundColor: '#212121',
                    border: '.2rem solid #00bcd4',
                    borderRadius: '.6rem',
                    marginTop: '8rem',
                    marginBottom: '2rem'
                }}
            >
                <Box
                    sx = {{
                        paddingTop: '2rem',
                        paddingBottom: '2rem',
                        paddingLeft: '6rem',
                        paddingRight: '6rem'
                    }} 
                >
                    <Typography 
                        variant = 'h2'
                        color = '#00bcd4'
                        sx = {{
                            marginBottom: '6rem'
                        }}
                    >
                    User Profile 
                    </Typography>
                    
                </Box>

            </form>
        </div>
    )
}

export default Profile;