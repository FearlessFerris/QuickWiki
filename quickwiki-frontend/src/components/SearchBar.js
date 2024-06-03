// SearchBar Component Implementation 


// Dependencies 
import React, { useState, usetEffect } from 'react';
import { Box, Button, FormControl, TextField, Typography } from '@mui/material';


// Components & Necessary Files 
import '../static/SearchBar.css';


// SearchBar Component 
function SearchBar() {

    const [ search, setSearch ] = useState( '' );

    const handleChange = ( e ) => {
        setSearch( e.target.value );
    }

    return (
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
                            style: { color: '#26a69a' },
                        }}
                        InputProps={{
                            sx: {
                                color: '#26a69a',
                                '& fieldset': {
                                    borderColor: '#26a69a',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#26a69a',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#26a69a',
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
                        color: '#26a69a',
                        borderColor: '#26a69a',
                        '&:hover': {
                            backgroundColor: '#26a69a', 
                            borderColor: '#26a69a',
                            color: '#263238', 
                        }
                    }}
                    >
                Search
                </Button>
                </div>
            </Box>
        </div>
    )
}


export default SearchBar;