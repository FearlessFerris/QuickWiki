// SearchBar Component Implementation 


// Dependencies 
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Button, FormControl, TextField, Typography, ThemeProvider, createTheme } from '@mui/material';
import { debounce } from 'lodash';


// Components & Necessary Files 
import '../static/SearchBar.css';
import apiClient from '../api/apiClient';
import { useLoggedIn } from './ContextDirectory.js/LoggedInContext';


// // SearchBar Component 
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
            fontSize: 'large',
          },
        },
      },
    },
  },
});

function SearchBar({ results, setResults }) {
  const { userId } = useLoggedIn();
  const [search, setSearch] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [animationSeen, setAnimationSeen] = useState(false);
  const [exampleIndex, setExampleIndex] = useState(0);
  const [typingInterval, setTypingInterval] = useState(null);
  const exampleSearches = ['Anthony Bourdain', 'Michael Giacchino', 'David Gilmour', 'Banksy', 'Philip Seymour Hoffman', 'Jurassic Park'];
  const latestQuery = useRef('');

  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    setIsTyping(true);
    latestQuery.current = value; 
  };

  const fetchResults = async (query, userId) => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }
    try {
      const headers = userId ? { 'user_id': userId } : {};
      const response = await apiClient.get(`/search/${query}`, { headers });
      const pages = response.data.data.pages;
      setResults(pages);
    } catch (error) {
      console.error('Error occurred fetching results!', error);
    }
  };

  const debouncedFetchResults = useCallback(
    debounce((query) => {
      if (query === latestQuery.current) {
        fetchResults(query, userId);
      }
    }, 250),
    [userId]
  );

  useEffect(() => {
    if (search.trim() === '') {
      setResults([]);
    } else {
      debouncedFetchResults(search);
    }
  }, [search, debouncedFetchResults]);

  useEffect(() => {
    if (isTyping || animationSeen) return;

    const startTypingEffect = () => {
      let charIndex = 0;
      const currentSearch = exampleSearches[exampleIndex];
      const intervalId = setInterval(() => {
        setSearch((prevSearch) => currentSearch.substring(0, charIndex + 1));
        charIndex++;
        if (charIndex >= currentSearch.length) {
          clearInterval(intervalId);
          setTimeout(() => {
            setSearch('');
            setExampleIndex((prevIndex) => (prevIndex + 1) % exampleSearches.length);
          }, 8000);
        }
      }, 50);
      setTypingInterval(intervalId);
    };

    const startAnimationDelay = setTimeout(() => {
      if (!isTyping && !animationSeen) {
        startTypingEffect();
      }
    }, 5000);

    const animationInterval = setInterval(() => {
      if (!isTyping && !animationSeen) {
        startTypingEffect();
      }
    }, 20000);

    return () => {
      clearTimeout(startAnimationDelay);
      clearInterval(animationInterval);
      if (typingInterval) clearInterval(typingInterval);
    };
  }, [exampleIndex, isTyping, animationSeen]);

  const handleFocus = () => {
    setSearch('');
    setIsTyping(true);
    setAnimationSeen(true);
    if (typingInterval) {
      clearInterval(typingInterval);
      setTypingInterval(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (search.trim() !== '') {
      fetchResults(search, userId);
    } else {
      setResults([]);
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <div className='form-container'>
        <Box
          onSubmit={handleSubmit}
          component='form'
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '4rem',
          }}
        >
          <FormControl variant='outlined' fullWidth>
            <TextField
              id='search-input'
              label='Search'
              variant='outlined'
              placeholder='Something amazing loading...'
              className='search-input'
              InputLabelProps={{
                style: { color: '#00bcd4' },
              }}
              InputProps={{
                sx: {
                  color: '#00bcd4',
                },
              }}
              value={search}
              onChange={handleChange}
              onFocus={handleFocus}
            />
          </FormControl>
          <div>
            <Button
              type='submit'
              disabled={search.trim() === ''}
              className='search-button'
              variant='outlined'
              sx={{
                backgroundColor: '#212121',
                border: '.2rem solid #212121',
                color: '#00bcd4',
                fontSize: 'large',
                width: '8rem',
                '&:hover': {
                  backgroundColor: '#00bcd4',
                  border: '.2rem solid #00bcd4',
                  color: '#212121',
                  fontSize: 'large',
                },
                '&.Mui-disabled': {
                  backgroundColor: '#212121',
                  border: '.2rem solid #212121',
                  color: '#00bcd4',
                },
              }}
            >
              Search
            </Button>
          </div>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default SearchBar;
