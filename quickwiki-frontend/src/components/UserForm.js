// User Form Component Implementation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Box, Button, IconButton, Input, InputAdornment, TextField, Typography } from '@mui/material';
import { CheckCircle, Error } from '@mui/icons-material';


// Components & Necessary Files 
import apiClient from '../api/apiClient';
import { useAlert } from './ContextDirectory.js/AlertContext';


// User Form Component 
function UserForm({ initialData = {}, setFormVisible }) {

    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState(initialData || {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        image_url: '',
        upload_image: ''
    });

    const [usernameValid, setUsernameValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false)
    const { displayAlert } = useAlert();
    const navigate = useNavigate();
    const [touchedFields, setTouchedFields] = useState({
        username: false,
        password: false,
        confirmPassword: false,
        email: false,
    });

    useEffect(() => {
        setFormData(initialData || {
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
            image_url: '',
            upload_image: ''
        });
    }, [initialData]);

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

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouchedFields((prev) => ({
            ...prev,
            [name]: true,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: formData[name] ? '' : `${name.charAt(0).toUpperCase() + name.slice(1)} is a required field`,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((previousData) => ({
            ...previousData,
            uploadImage: e.target.files[0],
        }));
    };

    const handleUploadButtonClick = () => {
        document.getElementById('upload-button').click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
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

            const response = await apiClient.patch('/profile', formData);
            console.log(response);
            displayAlert(`User ${formData.username} Successfully Updated!`, 'success');
            setFormData(( previousData ) => ({
                ...previousData,
                password: '',
                confirmPassword: ''
            }));
            setErrors({});
            navigate('/user/profile');
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
                    Edit Form
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
                                        {formData.username && !errors.username && (
                                            <IconButton size='small'>
                                                <CheckCircle style={{ color: '#00bcd4' }} />
                                            </IconButton>
                                        )}
                                        {formData.username && errors.username && (
                                            <IconButton size='small'>
                                                <Error style={{ color: '#6a1b9a' }} />
                                            </IconButton>
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
                                        borderColor: formData.username && !errors.username ? '#00bcd4' : '#6a1b9a',
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
                                        {passwordValid && formData.password && (
                                            <IconButton size='small'>
                                                <CheckCircle style={{ color: '#00bcd4' }} />
                                            </IconButton>
                                        )}
                                        {!passwordValid && formData.password && (
                                            <IconButton size='small'>
                                                <Error style={{ color: '#6a1b9a' }} />
                                            </IconButton>
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
                                    autoComplete: 'new-password'
                                }
                            }}
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
                                '& .MuiFormHelperText-root': {
                                    color: '#6a1b9a',
                                    fontSize: '1rem',
                                    '&.Mui-error': {
                                        color: '#6a1b9a',
                                    }
                                },
                                '& .Mui-error .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#6a1b9a',
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
                            error={touchedFields.confirmPassword && !!errors.confirmPassword}
                            helperText={touchedFields.confirmPassword && errors.confirmPassword}
                            label='Confirm Password'
                            name='confirmPassword'
                            type='password'
                            placeholder='Confirm password'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={formData.confirmPassword}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        {confirmPasswordValid && formData.confirmPassword && (
                                            <IconButton size='small'>
                                                <CheckCircle style={{ color: '#00bcd4' }} />
                                            </IconButton>
                                        )}
                                        {!confirmPasswordValid && formData.confirmPassword && (
                                            <IconButton size='small'>
                                                <Error style={{ color: '#6a1b9a' }} />
                                            </IconButton>
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
                                    autoComplete: 'new-password'
                                }
                            }}
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
                                '& .MuiFormHelperText-root': {
                                    color: '#6a1b9a',
                                    fontSize: '1rem',
                                    '&.Mui-error': {
                                        color: '#6a1b9a',
                                    }
                                },
                                '& .Mui-error .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#6a1b9a',
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
                            placeholder='Enter email'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={formData.email}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        {formData.email && !errors.email && (
                                            <IconButton size='small'>
                                                <CheckCircle style={{ color: '#00bcd4' }} />
                                            </IconButton>
                                        )}
                                        {formData.email && errors.email && (
                                            <IconButton size='small'>
                                                <Error style={{ color: '#6a1b9a' }} />
                                            </IconButton>
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
                                        borderColor: formData.email && !errors.email ? '#00bcd4' : '#6a1b9a',
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
                            error={!!errors.image_url}
                            helperText={errors.image_url}
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
                            type='submit'
                            onClick={handleSubmit}
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
                            Apply Changes
                        </Button>
                        <Button
                            variant='outlined'
                            onClick={() => setFormVisible(false)}
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
                            Back
                        </Button>
                    </div>
                </Box>
            </form>
        </div>
    )
}

export default UserForm;