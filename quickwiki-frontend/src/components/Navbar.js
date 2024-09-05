// Navbar Component Implementation


// Dependencies
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AppBar, Box, Button, Menu, MenuItem, Toolbar } from '@mui/material';


// Components & Necessary Files
import { useLoggedIn } from './ContextDirectory.js/LoggedInContext';
import MenuSearchbar from './MenuSearchbar';


// Navbar Component
function Navbar() {
    const navigate = useNavigate();
    const { isLoggedIn, logout, userImage } = useLoggedIn();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleAvatarClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleProfileClick = () => {
        handleMenuClose();
        navigate('/user/profile');
    }

    const handleLogout = () => {
        logout();
        handleMenuClose();
        navigate('/user/login');
    };

    return (
        <div
            className="navbar-container"
            style={{
                width: '100%',
            }}
        >
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: '#212121',
                }}
            >
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Button
                            component={Link}
                            to="/"
                            variant="outlined"
                            size="large"
                            sx={{
                                color: '#00bcd4',
                                border: '.2rem solid #212121',
                                fontSize: 'large',
                                margin: '0 8px',
                                '&:hover': {
                                    backgroundColor: '#00bcd4',
                                    border: '.2rem solid #00bcd4',
                                    color: '#212121'
                                },
                            }}
                        >
                            Home
                        </Button>
                        {!isLoggedIn && (
                            <Button
                                component={Link}
                                to="/user/create"
                                variant="outlined"
                                size="large"
                                sx={{
                                    color: '#00bcd4',
                                    border: '.2rem solid #212121',
                                    fontSize: 'large',
                                    margin: '0 8px',
                                    '&:hover': {
                                        backgroundColor: '#00bcd4',
                                        border: '.2rem solid #00bcd4',
                                        color: '#212121'
                                    },
                                }}
                            >
                                Create
                            </Button>
                        )}
                        <Button
                            component={Link}
                            to="/searches"
                            variant="outlined"
                            size="large"
                            sx={{
                                color: '#00bcd4',
                                border: '.2rem solid #212121',
                                fontSize: 'large',
                                margin: '0 8px',
                                '&:hover': {
                                    backgroundColor: '#00bcd4',
                                    border: '.2rem solid #00bcd4',
                                    color: '#212121'
                                },
                            }}
                        >
                            Articles
                        </Button>
                        {isLoggedIn && (
                            <>
                                <Button
                                    component={Link}
                                    to="/user/bookmark"
                                    variant="outlined"
                                    size="large"
                                    sx={{
                                        color: '#00bcd4',
                                        border: '.2rem solid #212121',
                                        fontSize: 'large',
                                        margin: '0 8px',
                                        '&:hover': {
                                            backgroundColor: '#00bcd4',
                                            border: '.2rem solid #00bcd4',
                                            color: '#212121'
                                        },
                                    }}
                                >
                                    Bookmarks
                                </Button>
                            </>
                        )}
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <MenuSearchbar />
                        {isLoggedIn ? (
                            <>
                                <Avatar
                                    src={userImage}
                                    alt="User Avatar"
                                    sx={{
                                        border: '.1rem solid #00bcd4',
                                        marginLeft: '3rem',
                                        marginRight: '1rem',
                                        marginTop: '.1rem',
                                        width: '3.5rem',
                                        height: '3.5rem',
                                        cursor: 'pointer',
                                    }}
                                    onClick={handleAvatarClick}
                                />
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                    sx={{
                                        mt: '.5rem',
                                        marginLeft: '-.5rem',
                                        '& .MuiPaper-root': {
                                            backgroundColor: '#212121',
                                            color: '#00bcd4',
                                            width: '6rem',
                                            borderRadius: '.4rem'
                                        }
                                    }}
                                >
                                    <MenuItem
                                        onClick={handleProfileClick}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: '#00bcd4',
                                                color: '#212121'
                                            }
                                        }}
                                    >
                                        Profile
                                    </MenuItem>
                                    <MenuItem
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: '#00bcd4',
                                                color: '#212121'
                                            }
                                        }}
                                    >
                                        Settings
                                    </MenuItem>
                                    <MenuItem
                                        onClick={handleLogout}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: '#00bcd4',
                                                color: '#212121'
                                            }
                                        }}
                                    >
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Button
                                component={Link}
                                to="/user/login"
                                variant="outlined"
                                size="large"
                                sx={{
                                    color: '#00bcd4',
                                    border: '.2rem solid #212121',
                                    fontSize: 'large',
                                    margin: '0 8px',
                                    '&:hover': {
                                        backgroundColor: '#00bcd4',
                                        border: '.2rem solid #00bcd4',
                                        color: '#212121'
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
    );
}

export default Navbar;
