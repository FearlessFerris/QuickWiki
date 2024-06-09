// Login Component Implementation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { Box, Button, Input, TextField, PasswordField, Typography } from '@mui/material';


// Components & Necessary Files 
function Login() {

    return(
        <div 
            className = 'login-container'
        >

            <form 
                style = {{
                    backgroundColor: '#212121',
                    border: '.2rem solid #00bcd4',
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: '8rem',
                    marginBottom: '2rem'
                }}
            >
                <Box
                    sx = {{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        paddingTop: '2rem',
                        paddingBottom: '2rem',
                        // paddingLeft: '10rem',
                        // paddingRight: '10rem'
                    }}
                >
                    <Typography 
                        variant = 'h2'
                        color = '#00bcd4'
                        sx = {{
                            marginBottom: '6rem'
                        }}
                    >
                    Login
                    </Typography>
                    <div
                        style = {{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            marginTop: '1.5rem'
                        }}
                    >
                        <TextField
                            label = 'Username'
                            name = 'username'
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

export default Login;
