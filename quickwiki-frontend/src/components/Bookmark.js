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
    const [ visibleBookmarks, setVisibleBookmarks ] = useState(new Set());
    const [ hoveredIndex, setHoveredIndex ] = useState( null );


    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const response = await apiClient.get('/user/bookmark/all');
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
    )
}

export default Bookmark;