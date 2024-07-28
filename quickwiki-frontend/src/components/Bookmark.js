// Bookmark Component Implementation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Box, Button, Card, CardContent, CardMedia, CircularProgress, Typography, } from '@mui/material';


// Components & Necessary Files 
import apiClient from '../api/apiClient';


// Bookmark Component 
function Bookmark() {

    const [ bookmarks, setBookmarks ] = useState([]);

    useEffect( () => {
        const fetchBookmarks = async () => {
            try{
                const response = await apiClient.get( '/user/bookmark/all' );
                console.log( response.data.data );
                setBookmarks( response.data.data );
            }
            catch( error ){
                console.error( 'Error loading user bookmarks!', error );
            }
        }

        fetchBookmarks();
    }, [ ]);

    return(
        <div 
            className = 'bookmark-container'
        >   
            <Typography
                variant = 'h2'
                color = '#00bcd4'
                sx = {{
                    marginTop: '8rem',
                    marginBottom: '2rem',
                    textAlign: 'center'
                }}
            >
            Bookmarks 
            </Typography>
            { bookmarks.map(( item, index ) => (
                <Link 
                    to = { `/search/page/${ item.page_id }` }
                    key = { index }
                    style = {{
                        textDecoration: 'none'
                    }}
                >
                <Card
                    key={index} 
                    sx={{ 
                        borderRadius: '1rem',
                        backgroundColor: '#212121',
                        display: 'flex',
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        margin: '1rem', 
                        padding: '1rem', 
                        boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)',
                        width: '50rem',
                        height: '4rem',
                        flexGrow: 1,
                    }}
                >
                <Typography
                    variant = 'h4'
                    color = '#00bcd4'
                    noWrap
                >
                    { item.page_id }

                </Typography>

                {/* <Typography
                    variant = 'h5'
                    color = '#00bcd4'
                    noWrap 
                >
                    { item.created_at }
                </Typography> */}
                </Card>
            </Link>
            ))}
        </div>
    )
}

export default Bookmark;