// Implementation of Create User Form Component 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { Box, Button, Input, TextField, PasswordField, Typography } from '@mui/material';


// Components & Necessary Files 
function CreateUserForm() {

    const [ formData, setFormData ] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        imageUrl: '',
        uploadImage: ''
    })

    const handleChange = ( e ) => {
        const { name, value } = e.target;
        setFormData(( previousData ) => ({
            ...previousData,
            [ name ]: value
        }));  
        console.log( value )
    };

    const handleSubmit = ( e ) => {
        e.preventDefault();
        console.log( formData );
    } 

    return (
        <div
            className='createUserform-container'
        >
            <form 
                onSubmit = { handleSubmit }
                style = {{
                    border: '.2rem solid #212121',
                    borderRadius: '.6rem',
                    marginTop: '8rem'
                }}
            >

                <Box
                    sx={{
                        paddingTop: '2rem',
                        paddingBottom: '2rem',
                        paddingLeft: '6rem',
                        paddingRight: '6rem'
                    }}
                >
                    <Typography
                        variant='h2'
                        color='#00bcd4'
                        sx = {{
                            marginBottom: '6rem'
                        }}
                    >
                    Create User
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
                            label = 'Username'
                            name = 'username'
                            value = { formData.username }
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
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            marginTop: '1.5rem'
                        }}
                    >
                        <TextField
                            label = 'Password'
                            name = 'password'
                            type = 'password'
                            value = { formData.password }
                            onChange = { handleChange }
                            placeholder = 'Ex: NotEzPassword123'
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
                                    autoComplete: 'current-password'
                                }
                            }}
                        ></TextField>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            marginTop: '1.5rem'
                        }}
                    >
                        <TextField
                            label = 'Confirm Password'
                            name = 'confirm-password'
                            type = 'password'
                            value = { formData.confirmPassword }
                            onChange = { handleChange }
                            placeholder = 'Ex: superSecret198*'
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
                                    autoComplete: 'current-password'
                                }
                            }}
                        ></TextField>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            marginTop: '1.5rem'
                        }}
                    >
                        <TextField
                            label = 'Email'
                            name = 'email'
                            type = 'email'
                            value = { formData.email }
                            onChange = { handleChange }
                            placeholder = 'Ex: GeorgeontheDelaware@gmail.com'
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
                                    autoComplete: 'email'
                                }
                            }}
                        ></TextField>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            marginTop: '1.5rem'
                        }}
                    >
                        <TextField
                            label = 'Image URL'
                            name = 'imageurl'
                            type = 'text'
                            value = { formData.imageUrl }
                            onChange = { handleChange }
                            placeholder = 'Ex: coolpicture@coolimages.net'
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
                                    autoComplete: 'email'
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
                            variant = 'outlined'
                            sx = {{
                                backgroundColor: '#212121',
                                border: '.2rem solid #212121',
                                color: '#00bcd4',
                                fontSize: 'large',
                                margin: '.5rem',
                                '&:hover': {
                                    border: '.2rem solid #00bcd4',
                                    color: '#00bcd4', 
                                    fontSize: 'large'
                                },
                            }}
                            >
                        Create   
                        </Button>


                        <Input 
                            name = 'upload-image'
                            type = 'file'
                            value = { formData.uploadImage }
                            onChange = { handleChange }
                            style = {{
                                display: 'none'
                            }}
                        >
                        </Input>
                        <Button 
                            variant = 'outlined'
                            sx = {{
                                backgroundColor: '#212121',
                                border: '.2rem solid #212121',
                                color: '#00bcd4',
                                fontSize: 'large',
                                margin: '.5rem',
                                '&:hover': {
                                    border: '.2rem solid #00bcd4',
                                    color: '#00bcd4', 
                                    fontSize: 'large'
                                },
                            }}
                            >
                        Upload Image   
                        </Button>
                    </div>
                </Box>
            </form>
        </div>
    )

}

export default CreateUserForm;



