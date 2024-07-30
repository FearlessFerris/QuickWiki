// Bookmark Component Implementation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Box, Button, Card, CardContent, CardMedia, CircularProgress, Typography } from '@mui/material';
import { HighlightOffOutlined } from '@mui/icons-material';


// Components & Necessary Files 
import apiClient from '../api/apiClient';


// Bookmark Component 
function Bookmark() {

    const [ bookmarks, setBookmarks ] = useState([]);
    const [ isEditing, setIsEditing ] = useState( false );
    const [ visibleBookmarks, setVisibleBookmarks ] = useState(new Set());
    const [ hoveredIndex, setHoveredIndex ] = useState( null );


    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const response = await apiClient.get('/user/bookmark');
                setBookmarks(response.data.data);
                response.data.data.forEach((item, index) => {
                    setTimeout(() => {
                        setVisibleBookmarks(prev => new Set(prev).add(index));
                    }, index * 200); 
                });
            } catch (error) {
                console.error('Error loading user bookmarks!', error);
            }
        };

        fetchBookmarks();
    }, []);

    const handleMouseEnter = ( index ) => {
        setHoveredIndex( index );
    }

    const handleMouseLeave = () => {
        setHoveredIndex( null );
    }

    const getCardStyle = (index) => ({
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
        height: '3rem',
        flexGrow: 1,
        opacity: visibleBookmarks.has(index) ? 1 : 0,
        transition: 'opacity 1s ease-out, transform 0.3s ease-out, box-shadow 0.3s ease-out',
        transform: hoveredIndex === index ? 'scale(1.08)' : 'scale(1)',
        boxShadow: hoveredIndex === index
            ? '0 6px 12px rgba(0, 0, 0, 0.2)'
            : '0 3px 5px rgba(0, 0, 0, 0.1)',
        color: '#00bcd4', 
    });

    const handleEditing = () => {
        setIsEditing( value => !value );
    }

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
            <div 
                style = {{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    marginTop: '2rem',
                    marginBottom: '4rem'
                }}  
            >

            <Button
                variant='outlined'
                sx={{
                    color: '#00bcd4',
                    backgroundColor: '#212121',
                    border: '.2rem solid #212121',
                    fontSize: 'large',
                    width: '14rem',
                    '&:hover': {
                        border: '.2rem solid #00bcd4',
                        color: '#00bcd4',
                        fontSize: 'large'
                    },
                }}
                onClick = { handleEditing }
                >
            { isEditing ? 'Done' : 'Edit' }
            </Button>
            </div>

            { isEditing ? (
                <div>
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
                        sx = { getCardStyle( index )}
                        onMouseEnter = { () => handleMouseEnter( index ) }
                        onMouseLeave = { handleMouseLeave }
                        >
                    <Typography
                        variant = 'h4'
                        color = '#00bcd4'
                        noWrap
                        >
                        { item.page_id }
                    </Typography>
                    <Button
                        variant = 'outlined'
                        sx = {{
                            color: '#00bcd4',
                            backgroundColor: '#212121',
                            border: '.2rem solid #212121',
                            fontSize: 'large',
                            width: '2rem',
                            '&:hover': {
                                border: '.2rem solid #00bcd4',
                                color: '#00bcd4',
                                fontSize: 'large'
                            }
                        }}
                    >
                    <HighlightOffOutlined
                        fontSize = 'large'
                        sx = {{
                            color: '#ec407a'
                        }}
                    >
                    </HighlightOffOutlined>
                    </Button>
                    </Card>
                </Link>
                ))}
            </div>
            ): (
                <div>
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
                    sx = { getCardStyle( index )}
                    onMouseEnter = { () => handleMouseEnter( index ) }
                    onMouseLeave = { handleMouseLeave }
                    >
                    <Typography
                    variant = 'h4'
                    color = '#00bcd4'
                    noWrap
                    >
                    { item.page_id }
                    
                    </Typography>
                    </Card>
                    </Link>
                ))}
            </div>
            )}
        </div>
    )
}

export default Bookmark;