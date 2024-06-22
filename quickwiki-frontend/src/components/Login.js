// Login Component Implementation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Input, TextField, PasswordField, Typography } from '@mui/material';
import apiClient from '../api/apiClient';


// Components & Necessary Files 
function Login() {

    const navigate = useNavigate();
    const [ errors, setErrors ] = useState({});
    const [ formData, setFormData ] = useState({ 
        username: '',
        password: ''
    });

    const handleChange = ( e ) => {
        const { name, value } = e.target; 
        setFormData(( previousData ) => ({
            ...previousData,
            [ name ]: value 
        }));
        setErrors((previousErrors) => ({
            ...previousErrors,
            [name]: undefined
        }));
    };

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        const newErrors = {};
        if( formData.username === '' ){
            newErrors.username = 'Username is a required field';
        }
        if ( formData.password === '' ){
            newErrors.password = 'Password is a required field';
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        try{
            const response = await apiClient.post( '/login', formData )
            console.log( response.data );
            console.log( formData );
            console.log( response.data.ok );
            if( response.ok ){
                localStorage.setItem( 'userSessionToken', response.data.session_token )
                setFormData({ 
                    username: '', 
                    password: '' 
                });
                navigate( '/' );
            }
        }
        catch( error ){
            console.error( 'Error logging in!' );
        }
    };


    return(
        <div 
            className = 'login-container'
            style = {{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column'
            }}
        >

            <form 
                onSubmit = { handleSubmit }
                style = {{
                    backgroundColor: '#212121',
                    border: '.2rem solid #00bcd4',
                    borderRadius: '.6rem',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    padding: '3rem 6rem',
                    marginTop: '8rem',
                    marginBottom: '2rem',
                    width: '20rem'
                }}
            >
                    <Typography 
                        variant = 'h2'
                        color = '#00bcd4'
                        sx = {{
                            display: 'flex',
                            justifyContent: 'center',
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
                            error = { !!errors.username }
                            helperText = { errors.username || '' }
                            label = 'Username'
                            name = 'username'
                            value = { formData.username } 
                            onChange = { handleChange }
                            placeholder = 'Ex: Jack Sparrow'
                            sx={{ 
                                width: '100%', 
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#00bcd4',
                                        borderWidth: '.2rem'
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#00bcd4',
                                        borderWidth: '.2rem'
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#00bcd4',
                                        borderWidth: '.2rem'
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
                    <div
                        style = {{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            marginTop: '1.5rem'
                        }}
                    >
                        <TextField
                            error = { !!errors.password }
                            helperText = { errors.password || '' }
                            type = 'password'
                            label = 'Password'
                            name = 'password'
                            value = { formData.password }
                            onChange = { handleChange }
                            placeholder = 'Ex: SuperSecurePassword23'
                            sx={{ 
                                width: '100%', 
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#00bcd4',
                                        borderWidth: '.2rem'
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#00bcd4',
                                        borderWidth: '.2rem'
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#00bcd4',
                                        borderWidth: '.2rem'
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
                                    autoComplete: 'current-password'
                                }
                            }}
                        ></TextField>
                    </div>
                    <div 
                        style = {{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '3rem'
                        }}
                    >
                        <Button 
                            type = 'submit'
                            variant = 'outlined'
                            sx = {{
                                backgroundColor: '#212121',
                                border: '.2rem solid #212121',
                                color: '#00bcd4',
                                fontSize: 'large',
                                margin: '.5rem',
                                padding: '.6rem 2rem',
                                '&:hover': {
                                    border: '.2rem solid #00bcd4',
                                    color: '#00bcd4', 
                                    fontSize: 'large',
                                    padding: '.6rem 2rem'
                                },
                            }}
                            >
                        Login   
                        </Button>
                    </div>
            </form>
        </div>
    )
}

export default Login;
