// Navbar Component Implementation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, Container, createTheme, IconButton, Menu, MenuItem, TextField, Toolbar, Typography, ThemeProvider } from '@mui/material';


// Components & Necessary Files 


// Navbar Component 
const customTheme = createTheme({
    palette: {
      primary: {
        main: '#00bcd4',
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& label.Mui-focused': {
              color: '#00bcd4',
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: '#00bcd4',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#00bcd4',
              },
              '&:hover fieldset': {
                borderColor: '#00bcd4',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#00bcd4',
              },
            },
          },
        },
      },
    },
  });

function Navbar(){




    return( 
        <div className = 'navbar-container'
            style = {{
                width: '100%'
            }}
        >
            <AppBar 
                position = 'static'
                sx = {{
                    backgroundColor: '#212121',
                }}
            >
                <Toolbar
                    sx = {{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >

                    <Box 
                    sx = {{
                        backgroundColor: '#212121',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                    >
                        <Button
                            component = { Link }
                            to = '/'
                            variant="outlined"
                            size="large"
                            sx={{
                                color: customTheme.palette.primary.main,
                                borderColor: customTheme.palette.primary.main,
                                margin: '0 8px',
                                '&:hover': {
                                backgroundColor: 'rgba(0, 188, 212, 0.1)',
                                borderColor: customTheme.palette.primary.main,
                            },
                        }}
                        >
                        Home
                        </Button>
                        <Button
                            component = { Link }
                            to = '/user/create'
                            variant="outlined"
                            size="large"
                            sx={{
                                color: customTheme.palette.primary.main,
                                borderColor: customTheme.palette.primary.main,
                                margin: '0 8px',
                                '&:hover': {
                                backgroundColor: 'rgba(0, 188, 212, 0.1)',
                                borderColor: customTheme.palette.primary.main,
                            },
                        }}
                        >
                        Create
                        </Button>
                        <Button
                            component = { Link }
                            to = '/searches'
                            variant="outlined"
                            size="large"
                            sx={{
                                color: customTheme.palette.primary.main,
                                borderColor: customTheme.palette.primary.main,
                                margin: '0 8px',
                                '&:hover': {
                                backgroundColor: 'rgba(0, 188, 212, 0.1)',
                                borderColor: customTheme.palette.primary.main,
                            },
                        }}
                        >
                        Articles 
                        </Button>
                        <Button
                            component = { Link }
                            to = '/user/login'
                            variant="outlined"
                            size="large"
                            sx={{
                                color: customTheme.palette.primary.main,
                                borderColor: customTheme.palette.primary.main,
                                margin: '0 8px',
                                '&:hover': {
                                backgroundColor: 'rgba(0, 188, 212, 0.1)',
                                borderColor: customTheme.palette.primary.main,
                            },
                        }}
                        >
                        Login
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar;