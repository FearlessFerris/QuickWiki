// Bookmark Group Component Implementation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Container, Typography } from '@mui/material';


// Components & Necessary Files 
import apiClient from '../api/apiClient';


// Bookmark Group Component 
function BookmarkGroup() {

    const { groupId } = useParams();
    const [ groupName, setGroupName ] = useState( null );
    const [ bookmarks, setBookmarks ] = useState([]);

    const fetchBookmarkGroupsBookmarks = async ( groupId ) => {
        try{
            const response = await apiClient.get( `/user/bookmark/groups/${ groupId }/bookmarks` );
            console.log( response.data );
            setGroupName( response.data.group );
            setBookmarks( response.data.bookmarks );
        }
        catch( error ){
            console.error('Error fetching Bookmark Groups Bookmarks');
            console.error('Error message:', error.message);
        if (error.response) {
            console.error('Error response data:', error.response.data);  
        }
    }
    }

    useEffect( () => {
        fetchBookmarkGroupsBookmarks( groupId );
    }, [ groupName ]);

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
                { groupName }
                </Typography>
                <CardMedia 
                    component = 'img'
                    sx = {{
                        borderRadius: '.4rem',
                        width: 'auto',
                        maxWidth: '20rem',
                        height: 'auto',
                        maxHeight: '20rem'
                    }}
                />
            </Box>
        </Container>
    )
}

export default BookmarkGroup;