// Menu Searchbar Component Implementation 


// Dependencies 
import React, { useState } from 'react';
import { FormControl, TextField } from '@mui/material';


// Components & Necessary Files 


// Menu Searchbar Component 
function MenuSearchbar() {

    return (
        <div className='menu-searchbar-container'>
            <FormControl fullWidth>
                <TextField
                    variant='outlined'
                    label='Menu Search'
                    placeholder='How can I help?'
                    InputLabelProps={{
                        sx: {
                            color: '#00bcd4',
                            top: '50%',
                            left: '5%',
                            transform: 'translateY(-50%)',
                            fontSize: '0.875rem',
                            transition: 'all 0.2s ease',
                            '&.Mui-focused': {
                                color: '#00bcd4',
                                top: '-.6rem',
                                left: '.8rem', 
                                transform: 'none', 
                                fontSize: '0.75rem', 
                            },
                        },
                    }}
                    InputProps={{
                        sx: {
                            color: '#00bcd4',
                            '&::placeholder': {
                                color: '#00bcd4',
                                opacity: 0.8, 
                            },
                            height: '2.5rem', 
                        },
                    }}
                    sx={{
                        marginTop: '.2rem',
                        backgroundColor: '#263238',
                        borderRadius: '.6rem',
                        width: '20rem',
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
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#00bcd4',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#00bcd4',
                        },
                    }}
                />
            </FormControl>
        </div>
    );
}

export default MenuSearchbar;