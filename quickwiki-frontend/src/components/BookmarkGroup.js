// Bookmark Group Component Implementation 


// Dependencies 
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';


// Components & Necessary Files 



// Bookmark Group Component 
function BookmarkGroup() {

    const { title } = useParams();

    return(
        <Container
            sx = {{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '12rem'
            }}
        >
            <Box 
                sx={{
                    backgroundColor: '#212121',
                    border: '.2rem solid #00bcd4',
                    borderRadius: '.6rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginBottom: '2rem',
                    width: '36rem',
                    minWidth: '36rem',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4), 0px 2px 4px rgba(0, 0, 0, 0.2)',
                    padding: '1rem'
                }}
            >
                <Typography
                    variant = 'h2'
                    color = '#00bcd4'
                    sx = {{
                        textAlign: 'center'
                    }}
                >
                { title }
                </Typography>
            </Box>
        </Container>
    )
}

export default BookmarkGroup;