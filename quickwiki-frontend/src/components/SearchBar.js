// SearchBar Component Implementation 


// Dependencies 
import React, { useCallback, useEffect, useState, usetEffect } from 'react';
import { Box, Button, FormControl, TextField, Typography, ThemeProvider, createTheme } from '@mui/material';
import { debounce } from 'lodash';


// Components & Necessary Files 
import '../static/SearchBar.css';
import apiClient from '../api/apiClient';
import { useLoggedIn } from './ContextDirectory.js/LoggedInContext';


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
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#212121',
          border: '.2rem solid #212121',
          fontSize: 'large',
          color: '#00bcd4',
          padding: '.6rem 1rem',
          '&:hover': {
            border: '.2rem solid #00bcd4',
            color: '#00bcd4',
            fontSize: 'large'
          }
        }
      }
    }
  },
});
  
function SearchBar({ results, setResults }) {

    const [ search, setSearch ] = useState( '' );
    const { userId } = useLoggedIn();


    const handleChange = ( e ) => {
        const { value } = e.target;
        setSearch( value );
        if( value.trim() === '' ){
          setResults([]);
        }
    }

    const fetchResults = async ( query, userId ) => {
      if( query.trim() === '' ){
        setResults([]);
        return;
      }
      try{
        const headers = userId ? { 'user_id': userId } : {};
        const response = await apiClient.get( `/search/${ query }`, {
          headers: headers,
        });
        const pages = response.data.data.pages;
        setResults( pages );
      }
      catch( error ){
        console.error( 'Error occured fetching results!' );
      }
    }

    const debouncedFetchResults = useCallback(
      debounce((query) => {
          if (query.trim() !== '') {
              fetchResults( query, userId );
          }
      }, 100),
      [ userId ]
  );

  useEffect(() => {
      if (search.trim() === '') {
          setResults([]);
      } else {
          debouncedFetchResults(search);
      }
  }, [search, debouncedFetchResults]);

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (search.trim() !== '') {
          fetchResults( search, userId );
      } else {
          setResults([]);
      }
  };

    return (
        <ThemeProvider theme = { customTheme }>
        <div 
          className='form-container'
        >
            <Box
                onSubmit = { handleSubmit }
                component='form'
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '4rem'
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
                              border: '.2rem solid #00bcd4',
                            },
                            '&:hover fieldset': {
                              border: '.2rem solid #00bcd4',
                            },
                            '&.Mui-focused fieldset': {
                              border: '.2rem solid #00bcd4',
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
                    type = 'submit'
                    className = 'search-button'
                    variant = 'outlined'
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