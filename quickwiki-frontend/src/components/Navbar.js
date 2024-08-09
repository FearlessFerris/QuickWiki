// Navbar Component Implementation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, Container, createTheme, IconButton, Menu, MenuItem, TextField, Toolbar, Typography, ThemeProvider } from '@mui/material';


// Components & Necessary Files 
import { useLoggedIn } from './ContextDirectory.js/LoggedInContext';

// Navbar Component 
function Navbar() {

    const navigate = useNavigate();
    const { isLoggedIn, logout } = useLoggedIn();

    const handleLogout = () => {
        logout();
        navigate( '/user/login' );
    }

    return (
        <div className='navbar-container'
            style={{
                width: '100%'
            }}
        >
            <AppBar
                position='static'
                sx={{
                    backgroundColor: '#212121',
                }}
            >
                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >

                    <Box
                        sx={{
                            backgroundColor: '#212121',
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <Button
                            component={Link}
                            to='/'
                            variant="outlined"
                            size="large"
                            sx={{
                                color: '#00bcd4',
                                border: '.2rem solid #212121',
                                fontSize: 'large',
                                margin: '0 8px',
                                '&:hover': {
                                    border: '.2rem solid #00bcd4',
                                },
                            }}
                        >
                            Home
                        </Button>
                        { !isLoggedIn && (
                            <Button
                            component={Link}
                            to='/user/create'
                            variant="outlined"
                            size="large"
                            sx={{
                                color: '#00bcd4',
                                border: '.2rem solid #212121',
                                fontSize: 'large',
                                margin: '0 8px',
                                '&:hover': {
                                    border: '.2rem solid #00bcd4',
                                },
                            }}
                            >
                            Create
                        </Button>
                        )}
                        <Button
                        component={Link}
                            to='/searches'
                            variant="outlined"
                            size="large"
                            sx={{
                                color: '#00bcd4',
                                border: '.2rem solid #212121',
                                fontSize: 'large',
                                margin: '0 8px',
                                '&:hover': {
                                    border: '.2rem solid #00bcd4',
                                },
                            }}
                        >
                            Articles
                        </Button>
                        {isLoggedIn ? (
                            <>
                                <Button
                                    component={Link}
                                    to='/user/profile'
                                    variant="outlined"
                                    size="large"
                                    sx={{
                                        color: '#00bcd4',
                                        border: '.2rem solid #212121',
                                        fontSize: 'large',
                                        margin: '0 8px',
                                        '&:hover': {
                                            border: '.2rem solid #00bcd4',
                                        },
                                    }}
                                >
                                    Profile
                                </Button>
                                <Button
                                    component={Link}
                                    to='/user/bookmark'
                                    variant="outlined"
                                    size="large"
                                    sx={{
                                        color: '#00bcd4',
                                        border: '.2rem solid #212121',
                                        fontSize: 'large',
                                        margin: '0 8px',
                                        '&:hover': {
                                            border: '.2rem solid #00bcd4',
                                        },
                                    }}
                                >
                                    Bookmarks
                                </Button>
                                <Button
                                    onClick={handleLogout}
                                    variant="outlined"
                                    size="large"
                                    sx={{
                                        color: '#00bcd4',
                                        border: '.2rem solid #212121',
                                        fontSize: 'large',
                                        margin: '0 8px',
                                        '&:hover': {
                                            border: '.2rem solid #00bcd4',
                                        },
                                    }}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <Button
                                component={Link}
                                to='/user/login'
                                variant="outlined"
                                size="large"
                                sx={{
                                    color: '#00bcd4',
                                    border: '.2rem solid #212121',
                                    fontSize: 'large',
                                    margin: '0 8px',
                                    '&:hover': {
                                        border: '.2rem solid #00bcd4',
                                    },
                                }}
                            >
                                Login
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar;