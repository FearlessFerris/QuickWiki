// Implementation of Create User Form Component 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Box, Button, IconButton, Input, InputAdornment, TextField, PasswordField, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { Error } from '@mui/icons-material';


// Components & Necessary Files 
import apiClient from '../api/apiClient';
import { useAlert } from './ContextDirectory.js/AlertContext';
import UserForm from './UserForm';


// Create User Component 
function CreateUserForm() {

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        image_url: '',
        upload_image: ''
    });

    const [errors, setErrors] = useState({});
    const [usernameValid, setUsernameValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false)
    const [ touchedFields, setTouchedFields ] = useState({
        username: false,
        password: false,
        confirmPassword: false,
        email: false,
        image_url: false,
        upload_image: false
    });
    const { displayAlert } = useAlert();
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFormData((previousData) => ({
            ...previousData,
            uploadImage: e.target.files[0],
        }));
    };

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
            [name]: value,
        }));
        switch (name) {
            case 'username':
                setUsernameValid(value.length >= 5); 
                break;
            case 'password':
                setPasswordValid(value.length >= 8);
                break;
            case 'confirmPassword':
                setConfirmPasswordValid(value === formData.password);
                break;
            case 'email':
                setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
                break;
            default:
                break;
        }
    };

    const handleUploadButtonClick = () => {
        document.getElementById('upload-button').click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newErrors = {};
            if (formData.username === '') {
                newErrors.username = 'Username is a required field';
            }
            if (formData.password === '') {
                newErrors.password = 'Password is a required field';
            }
            if (formData.confirmPassword === '') {
                newErrors.confirmPassword = 'Confirm Password is a required field';
            }
            if (formData.email === '') {
                newErrors.email = 'Email is a required field';
            }
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }

            const response = await apiClient.post( '/create', formData );
            displayAlert(`User ${formData.username} Successfully Created!`, 'success');
            setFormData({
                username: '',
                password: '',
                confirmPassword: '',
                email: '',
                image_url: '',
                upload_image: ''
            });
            setErrors({});
            navigate('/user/login');
        } catch (error) {
            console.error('Error Creating User Profile:', error.message);
            if (error.response && error.response.status === 400) {
                const { errors } = error.response.data;
                setErrors(errors);
            } else {
                setErrors({ message: 'An error occurred. Please try again later.' });
            }
        }
    };
    return (
        <div
            className='userform-container'
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <form
                onSubmit = { handleSubmit }
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
                Create User
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginBottom: '2rem'
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            margin: '.8rem'
                        }}
                    >
                        <TextField
                    error={!!errors.username && usernameValid }
                    helperText={errors.username}
                    label='Username'
                    name='username'
                    placeholder='Ex: Jack Sparrow'
                    onBlur={ handleBlur }
                    onChange={handleChange}
                    value={formData.username}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                {usernameValid && formData.username ? (
                                    <IconButton size='small'>
                                        <CheckCircle style={{ color: '#00bcd4' }} />
                                    </IconButton>
                                ) : (
                                    formData.username && (
                                        <IconButton size='small'>
                                            <Error style = {{ color: '#6a1b9a' }} />
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
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            margin: '.8rem'
                        }}
                    >

                        <TextField
                            error = { !!errors.password && passwordValid }
                            helperText = { errors.password }
                            label='Password'
                            name='password'
                            type='password'
                            onChange={handleChange}
                            placeholder='Ex: NotEzPassword123'
                            onBlur={ handleBlur }
                            value={formData.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        {passwordValid && formData.password ? (
                                            <IconButton size='small'>
                                                <CheckCircle style={{ color: '#00bcd4' }} />
                                            </IconButton>
                                        ) : (
                                            formData.password && (
                                                <IconButton size='small'>
                                                    <Error style = {{ color: '#6a1b9a' }} />
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
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            margin: '.8rem'
                        }}
                    >
                        <TextField
                            error = { !!errors.confirmPassword && confirmPasswordValid }
                            helperText = { errors.confirmPassword }
                            label='Confirm Password'
                            name='confirmPassword'
                            type='password'
                            placeholder='Ex: superSecret198*'
                            onBlur = { handleBlur }
                            onChange={handleChange}
                            value={formData.confirmPassword}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        {confirmPasswordValid && formData.confirmPassword ? (
                                            <IconButton size='small'>
                                                <CheckCircle style={{ color: '#00bcd4' }} />
                                            </IconButton>
                                        ) : (
                                            formData.confirmPassword && (
                                                <IconButton size='small'>
                                                    <Error style = {{ color: '#6a1b9a' }} />
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
                                        borderColor: !errors.confirmPassword ? '#00bcd4' : '#6a1b9a',
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
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            margin: '.8rem'
                        }}
                    >
                        <TextField
                        error={!!errors.email}
                        helperText={errors.email}
                        label='Email'
                        name='email'
                        type='email'
                        placeholder='Ex: GeorgeontheDelaware@gmail.com'
                        onBlur={ handleBlur }
                        onChange={handleChange}
                        value={formData.email}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    {emailValid && formData.email ? (
                                        <IconButton size='small'>
                                            <CheckCircle style={{ color: '#00bcd4' }} />
                                        </IconButton>
                                    ) : (
                                        formData.email && (
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
                                autoComplete: 'email'
                            }
                        }}
                        sx={{
                            width: '20rem',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: !errors.email ? '#00bcd4' : '#6a1b9a',
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
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            margin: '.8rem'
                        }}
                    >
                        <TextField
                            error = { !!errors.image_url }
                            helperText = { errors.image_url }
                            label='Image URL'
                            name='image_url'
                            type='text'
                            placeholder='Ex: coolpicture@coolimages.net'
                            onChange={handleChange}
                            value={formData.image_url}
                            sx={{
                                width: '20rem',
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
                                    autoComplete: 'url'
                                }
                            }}
                        ></TextField>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            marginTop: '.8rem',
                            marginBottom: '.8rem'
                        }}
                    >

                        <input
                            type='file'
                            onChange={handleFileChange}
                            style={{
                                display: 'none'
                            }}
                            id='upload-button'
                        />
                        <label
                            htmlFor='upload-button'
                        >

                            <Button
                                onClick={handleUploadButtonClick}
                                variant='outlined'
                                sx={{
                                    backgroundColor: '#212121',
                                    border: '.2rem solid #212121',
                                    color: '#00bcd4',
                                    fontSize: 'large',
                                    '&:hover': {
                                        border: '.2rem solid #00bcd4',
                                        color: '#00bcd4',
                                        fontSize: 'large'
                                    },
                                }}
                            >
                                Upload Image
                            </Button>
                        </label>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            marginTop: '2rem'
                        }}
                    >
                        <Button
                            variant='outlined'
                            onClick = { handleSubmit }
                            sx={{
                                backgroundColor: '#212121',
                                border: '.2rem solid #212121',
                                color: '#00bcd4',
                                fontSize: 'large',
                                '&:hover': {
                                    border: '.2rem solid #00bcd4',
                                    color: '#00bcd4',
                                    fontSize: 'large'
                                },
                            }}
                        >
                        Create
                        </Button>
                    </div>
                </Box>
            </form>
        </div>
    )
}
export default CreateUserForm;



