// Profile Component Implementation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Box, Button, Input, TextField, PasswordField, Typography } from '@mui/material';


// Components & Necessary Files 
import apiClient from '../api/apiClient';


// Profile Component 
function Profile() {

    const [ profile, setProfile ] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        image_url: '',
        upload_image: ''
    });

    const handleChange = ( e ) => {
        const { name, value } = e.target;
        setProfile(( previousData ) => ({
            ...previousData,
            [ name ]: value
        }));
    }

    useEffect( () => {
        const fetchProfile = async () => {
            try{
                const response = await apiClient.get( '/profile' );
                console.log( response )
                console.log( response.data.user )
                const { username, email, image_url, upload_image } = response.data.user;
                console.log( username )
                // setProfile(( previousData ) => ({
                //     ...previousData,
                //     username: 
                // }))
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
                    
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            marginTop: '1.5rem'
                        }}
                    >
                        <TextField
                            // error = { !!errors.username }
                            // helperText = { errors.username || '' }
                            label = 'Username'
                            name = 'username'
                            value = { profile.username }
                            onChange = { handleChange }
                            placeholder = 'Ex: Jack Sparrow'
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#00bcd4',
                                        borderWidth: '.2rem',
                                        width: '20rem'
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#00bcd4',
                                        borderWidth: '.2rem',
                                        width: '20rem'
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#00bcd4',
                                        borderWidth: '.2rem',
                                        width: '20rem'
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#00bcd4',
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#00bcd4',
                                },
                            }}
                            InputProps={{
                                style: {
                                    color: 'white'
                                },
                                inputProps: {
                                    style: {
                                        color: '#00bcd4',
                                        '&::placeholder': {
                                            color: '#00bcd4',
                                            opacity: 1,
                                        }
                                    },
                                    autoComplete: 'current-username'
                                }
                            }}
                        ></TextField>
                    </div>
                </Box>
            </form>
        </div>
    )
}

export default Profile;