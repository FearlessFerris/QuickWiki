// SearchBar Component Implementation 


// Dependencies 
import React, { useState, usetEffect } from 'react';
import { Box, Button, FormControl, TextField, Typography, ThemeProvider, createTheme } from '@mui/material';


// Components & Necessary Files 
import '../static/SearchBar.css';


// SearchBar Component 
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
  
function SearchBar() {

    const [ search, setSearch ] = useState( '' );

    const handleChange = ( e ) => {
        setSearch( e.target.value );
    }

    return (
        <ThemeProvider theme = { customTheme }>
        <div className='form-container'>
            <Box
                component='form'
                sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <FormControl variant='outlined' fullWidth>
                    <TextField
                        id='search-input'
                        label='Search'
                        variant='outlined'
                        placeholder = 'Something amazing loading...'
                        className='search-input'
                        InputLabelProps={{
                            style: { color: '#00bcd4' },
                        }}
                        InputProps={{
                            sx: {
                                color: '#00bcd4',
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
                        }}
                        value = { search }
                        onChange = { handleChange }
                        >
                    </TextField>
                </FormControl>
                <div>

                <Button
                    className='search-button'
                    variant='outlined'
                    
                    style={{
                        fontSize: '1.2rem',
                        padding: '.6rem 1.5rem',
                        color: '#00bcd4',
                        borderColor: '#00bcd4',
                        '&:hover': {
                            backgroundColor: '#00bcd4', 
                            borderColor: '#00bcd4',
                            color: '#00bcd4', 
                        }
                    }}
                    >
                Search
                </Button>
                </div>
            </Box>
        </div>
    </ThemeProvider>
    )
}


export default SearchBar;