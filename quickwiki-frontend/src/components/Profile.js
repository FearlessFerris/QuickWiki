// Profile Component Implementation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Avatar, Box, Button, Input, TextField, Tooltip, PasswordField, Typography } from '@mui/material';


// Components & Necessary Files 
import apiClient from '../api/apiClient';
import { useAlert } from './ContextDirectory.js/AlertContext';
import UserForm from './UserForm';


// Profile Component 
function Profile() {

    const [profile, setProfile] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        image_url: '',
        upload_image: ''
    });

    const [formVisible, setFormVisible] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await apiClient.get('/profile');
                const { username, email, image_url, upload_image } = response.data.user;
                setProfile((previousData) => ({
                    ...previousData,
                    username,
                    email,
                    image_url,
                    upload_image
                }));
            }
            catch (error) {
                console.error('Error fetching user profile');
            }
        }

        fetchProfile();
    }, []);

    useEffect(() => {
    }, [profile]);

    const handleEditChange = () => {
        setFormVisible(!formVisible);
    }

    const updateProfileData = (updatedData) => {
        setProfile((prevData) => ({
            ...prevData,
            ...updatedData
        }));
        setFormVisible(false);
    }

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
    }

    return (
        <div
            className='profile-container'
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            {formVisible ? (
                <UserForm initialData={profile} setFormVisible={setFormVisible} updateProfileData={updateProfileData} />
            ) : (
                <>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            backgroundColor: '#212121',
                            border: '.2rem solid #00bcd4',
                            borderRadius: '.6rem',
                            marginTop: '12rem',
                            marginBottom: '2rem',
                            width: '36rem'
                        }}
                    >
                        <Typography
                            variant='h2'
                            color='#00bcd4'
                            sx={{
                                textAlign: 'center',
                                marginTop: '2rem',
                                marginBottom: '4rem'
                            }}
                        >
                            User Profile
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginBottom: '2rem'
                            }}
                        >
                            <Avatar
                                alt={profile.username}
                                src={profile.image_url}
                                sx={{
                                    aspectRatio: '1/1',
                                    backgroundColor: 'white',
                                    border: '.2rem solid #00bcd4',
                                    objectFit: 'contain',
                                    height: '16rem',
                                    width: 'auto'
                                }}
                            />
                        </Box>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'start',
                                flexDirection: 'row',
                                margin: '.2rem',
                                marginLeft: '4rem'
                            }}
                        >
                            <Typography
                                variant='h5'
                                color='white'
                            >
                                Username:
                            </Typography>

                            <Typography
                                variant='h5'
                                color='#00bcd4'
                                sx={{
                                    marginLeft: '1rem'
                                }}
                            >
                                {profile.username}
                            </Typography>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'start',
                                flexDirection: 'row',
                                margin: '.2rem',
                                marginLeft: '4rem'
                            }}
                        >
                            <Typography
                                variant='h5'
                                color='white'
                            >
                                Email:
                            </Typography>

                            <Typography
                                variant='h5'
                                color='#00bcd4'
                                sx={{
                                    marginLeft: '1rem'
                                }}
                            >
                                {profile.email}
                            </Typography>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'start',
                                flexDirection: 'row',
                                margin: '.2rem',
                                marginLeft: '4rem'
                            }}
                        >
                            <Typography
                                variant='h5'
                                color='white'
                            >
                                Image Url:
                            </Typography>

                            <Typography
                                variant='h5'
                                color='#00bcd4'
                                sx={{
                                    marginLeft: '1rem'
                                }}
                            >
                                {truncateText(profile.image_url, 28)}
                            </Typography>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'row',
                                marginTop: '2rem',
                                marginBottom: '2rem'
                            }}
                        >
                            <Button
                                variant='outlined'
                                onClick={handleEditChange}
                                sx={{
                                    backgroundColor: '#212121',
                                    border: '.2rem solid #212121',
                                    color: '#00bcd4',
                                    fontSize: 'large',
                                    width: '12rem',
                                    '&:hover': {
                                        backgroundColor: '#00bcd4',
                                        border: '.2rem solid #00bcd4',
                                        color: '#212121',
                                        fontSize: 'large'
                                    },
                                }}
                            >
                                Edit
                            </Button>
                        </div>
                    </Box>
                </>
            )}
        </div>
    )
}

export default Profile;