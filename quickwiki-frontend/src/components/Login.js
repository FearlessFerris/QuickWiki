// Login Component Implementation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Input, InputAdornment, IconButton, TextField, PasswordField, Typography } from '@mui/material';
import apiClient from '../api/apiClient';
import { CheckCircle, Error } from '@mui/icons-material';


// Components & Necessary Files 
import { useAlert } from './ContextDirectory.js/AlertContext';
import { useLoggedIn } from './ContextDirectory.js/LoggedInContext';


// Login Component 
function Login() {
    const [errors, setErrors] = useState({});
    const [usernameIsValid, setUsernameIsValid] = useState(false);
    const [passwordIsValid, setPasswordIsValid] = useState(false);
    const [touchedFields, setTouchedFields] = useState({
        username: false,
        password: false
    });
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();
    const { displayAlert } = useAlert();
    const { login } = useLoggedIn();

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouchedFields(prev => ({
            ...prev,
            [name]: true,
        }));
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: formData[name] ? '' : `${name.charAt(0).toUpperCase() + name.slice(1)} is a required field`
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        switch (name) {
            case 'username':
                setUsernameIsValid(value.length >= 5);
                break;
            case 'password':
                setPasswordIsValid(value.length >= 8);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!usernameIsValid || formData.username === '') {
            newErrors.username = 'Username must be at least 5 characters long';
        }
        if (!passwordIsValid || formData.password === '') {
            newErrors.password = 'Please enter a valid password';
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        try {
            const response = await apiClient.post('/login', formData);
            if (response.status === 200 && response.data.user_id) {
                const { access_token, user_id, message } = response.data;
                localStorage.setItem('access_token', access_token);
                login(user_id);
                displayAlert(message, 'success');
                setFormData({ 
                    username: '', 
                    password: '' 
                });
                navigate('/');
            }
        } catch (error) {
            console.error('Error logging in!');
            displayAlert(error.response.data.message, 'error');
            setFormData({ username: '', password: '' });
        }
    };

    return (
        <div
            className='login-container'
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundColor: '#212121',
                    border: '.2rem solid #00bcd4',
                    borderRadius: '.6rem',
                    marginTop: '8rem',
                    marginBottom: '2rem',
                    width: '36rem'
                }}
            >
                <Typography
                    variant='h2'
                    color='#00bcd4'
                    sx={{
                        textAlign: 'center',
                        marginBottom: '6rem',
                        marginTop: '2rem'
                    }}
                >
                    Login
                </Typography>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginBottom: '1rem'
                    }}
                >
                    <TextField
                        error={touchedFields.username && !!errors.username}
                        helperText={touchedFields.username && errors.username}
                        label='Username'
                        name='username'
                        placeholder='Enter username'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={formData.username}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    {usernameIsValid && formData.username ? (
                                        <IconButton size='small'>
                                            <CheckCircle style={{ color: '#00bcd4' }} />
                                        </IconButton>
                                    ) : (
                                        formData.username && (
                                            <IconButton size='small'>
                                                <Error style={{ color: '#6a1b9a' }} />
                                            </IconButton>
                                        )
                                    )}
                                </InputAdornment>
                            ),
                            style: {
                                color: 'white',
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
                        sx={{
                            width: '20rem',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: !errors.username ? '#00bcd4' : '#6a1b9a',
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
                                '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#6a1b9a',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: '#00bcd4',
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#00bcd4',
                            },
                            '& .MuiFormHelperText-root': {
                                color: '#6a1b9a',
                                fontSize: '1rem',
                                '&.Mui-error': {
                                    color: '#6a1b9a',
                                }
                            },
                        }}
                    />

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            margin: '.8rem'
                        }}
                    >
                        <TextField
                            error={touchedFields.password && !!errors.password}
                            helperText={touchedFields.password && errors.password}
                            label='Password'
                            name='password'
                            type='password'
                            placeholder='Enter password'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={formData.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        {passwordIsValid && formData.password ? (
                                            <IconButton size='small'>
                                                <CheckCircle style={{ color: '#00bcd4' }} />
                                            </IconButton>
                                        ) : (
                                            formData.password && (
                                                <IconButton size='small'>
                                                    <Error style={{ color: '#6a1b9a' }} />
                                                </IconButton>
                                            )
                                        )}
                                    </InputAdornment>
                                ),
                                style: {
                                    color: 'white',
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
                            sx={{
                                width: '20rem',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: !errors.password ? '#00bcd4' : '#6a1b9a',
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
                                    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#6a1b9a',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#00bcd4',
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#00bcd4',
                                },
                                '& .MuiFormHelperText-root': {
                                    color: '#6a1b9a',
                                    fontSize: '1rem',
                                    '&.Mui-error': {
                                        color: '#6a1b9a',
                                    }
                                },
                            }}
                        />
                    </div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '1rem'
                    }}
                >
                    <Button
                        type='submit'
                        variant='outlined'
                        sx={{
                            backgroundColor: '#212121',
                            border: '.2rem solid #212121',
                            color: '#00bcd4',
                            fontSize: 'large',
                            margin: '.5rem',
                            marginBottom: '2rem',
                            padding: '.6rem 2rem',
                            '&:hover': {
                                backgroundColor: '#00bcd4',
                                border: '.2rem solid #00bcd4',
                                color: '#212121',
                                fontSize: 'large'
                            },
                        }}
                    >
                        Login
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Login;