// Bookmark Component Implementation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Backdrop, Box, Button, Card, CardContent, CardMedia, CircularProgress, Select, TextField, Typography, } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';


// Components & Necessary Files 
import apiClient from '../api/apiClient';
import { useAlert } from './ContextDirectory.js/AlertContext';


// Bookmark Component 
function Bookmark() {

    const [bookmarks, setBookmarks] = useState([]);
    const [visibleBookmarks, setVisibleBookmarks] = useState(new Set());
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isSorting, setIsSorting] = useState(false);
    const { displayAlert } = useAlert();
    
    const [ backdrop, setBackdrop ] = useState( false );
    const [ containers, setContainers ] = useState([]);
    const [ containerName, setContainerName ] = useState( '' ); 
    const [ selectedContainer, setSelectedContainer ] = useState( '' );

    const handleCloseBackdrop = () =>{
        // setBackdrop( false );
        console.log( 'You clicked close!!!' );
    }
    const handleOpenBackdrop = () => {
        setBackdrop( true );
    }

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

    const handleRemoveBookmark = async (pageId) => {
        try {
            const response = await apiClient.delete(`/user/bookmark/remove/${pageId}`);
            setBookmarks(previousBookmarks => previousBookmarks.filter(bookmark => bookmark.page_id !== pageId));
            const page = response.data.data;
            displayAlert(`${page}, was successfully removed from your bookmarks!`, 'success');
        }
        catch (error) {
            console.log(`Error removing bookmarked item`, error);
        }
    }


    const handleIsEditing = () => {
        setIsEditing(!isEditing);
    }

    const handleIsSorting = () => {
        setIsSorting(!isSorting);
    }

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    }

    const handleMouseLeave = () => {
        setHoveredIndex(null);
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
        width: '36rem',
        height: '2rem',
        flexGrow: 1,
        opacity: visibleBookmarks.has(index) ? 1 : 0,
        transition: 'opacity 1s ease-out, transform 0.3s ease-out, box-shadow 0.3s ease-out',
        transform: visibleBookmarks.has(index)
            ? hoveredIndex === index
                ? 'scale(1.07)'
                : 'scale(1)'
            : 'scale(0.8)',
        boxShadow: hoveredIndex === index
            ? '0 6px 12px rgba(0, 0, 0, 0.2)'
            : '0 3px 5px rgba(0, 0, 0, 0.1)',
        color: '#00bcd4',
    });

    return (
        <div
            className='bookmark-container'
        >
            <Box
                sx={{
                    backgroundColor: '#212121',
                    border: '.2rem solid #00bcd4',
                    borderRadius: '.6rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginTop: '8rem',
                    marginBottom: '2rem'
                }}
            >
                <Typography
                    variant='h2'
                    color='#00bcd4'
                    sx={{
                        textAlign: 'center',
                        marginTop: '2rem',
                        marginBottom: '2rem'
                    }}
                >
                    Bookmarks
                </Typography>
                {isEditing ? (
                    <div
                        style={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Button
                            sx={{
                                backgroundColor: '#212121',
                                border: '.2rem solid #212121',
                                color: '#00bcd4',
                                fontSize: 'large',
                                marginBottom: '2rem',
                                width: '12rem',
                                '&:hover': {
                                    border: '.2rem solid #00bcd4',
                                    color: '#00bcd4',
                                    fontSize: 'large'
                                },
                            }}
                            onClick={handleIsEditing}
                        >
                            Done
                        </Button>
                    </div>
                ) : isSorting ? (
                    <div
                        style={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Button
                            sx={{
                                backgroundColor: '#212121',
                                border: '.2rem solid #212121',
                                color: '#00bcd4',
                                fontSize: 'large',
                                marginBottom: '2rem',
                                width: '12rem',
                                '&:hover': {
                                    border: '.2rem solid #00bcd4',
                                    color: '#00bcd4',
                                    fontSize: 'large'
                                },
                            }}
                            onClick={handleIsSorting}
                        >
                            Done
                        </Button>
                    </div>
                ) : (
                    <>
                        <div
                            style={{
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'row',
                            }}
                        >
                            <Button
                                sx={{
                                    backgroundColor: '#212121',
                                    border: '.2rem solid #212121',
                                    color: '#00bcd4',
                                    fontSize: 'large',
                                    marginBottom: '2rem',
                                    marginRight: '1rem',
                                    width: '12rem',
                                    '&:hover': {
                                        border: '.2rem solid #00bcd4',
                                        color: '#00bcd4',
                                        fontSize: 'large'
                                    },
                                }}
                                onClick={handleIsEditing}
                            >
                                Edit
                            </Button>
                            <Button
                                sx={{
                                    backgroundColor: '#212121',
                                    border: '.2rem solid #212121',
                                    color: '#00bcd4',
                                    fontSize: 'large',
                                    marginBottom: '2rem',
                                    width: '12rem',
                                    '&:hover': {
                                        border: '.2rem solid #00bcd4',
                                        color: '#00bcd4',
                                        fontSize: 'large'
                                    },
                                }}
                                onClick={handleIsSorting}
                            >
                                Sort
                            </Button>
                        </div>
                    </>
                )}
            </Box>
            {bookmarks.map((item, index) => (
                <Link
                    to={`/search/page/${item.page_id}`}
                    key={index}
                    style={{
                        textDecoration: 'none'
                    }}
                >
                    <Card
                        key={index}
                        sx={getCardStyle(index)}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Typography
                            variant='h4'
                            color='#00bcd4'
                            noWrap
                        >
                            {item.page_id}

                        </Typography>
                        {isEditing ? (
                            <RemoveCircleOutline
                                sx={{
                                    position: 'absolute',
                                    fontSize: '3rem',
                                    right: '1rem',
                                    top: '50%',
                                    transform: 'translateY( -50% )',
                                    cursor: 'pointor',
                                    color: '#00bcd4',
                                    '&:hover': {
                                        color: '#6a1b9a',
                                    },
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    console.log(`You clicked to remove the ${item.page_id} bookmark!`);
                                    handleRemoveBookmark(item.page_id);
                                }}
                            />
                        ) : isSorting ? (
                            <AddCircleOutline
                                sx={{
                                    position: 'absolute',
                                    fontSize: '3rem',
                                    right: '1rem',
                                    top: '50%',
                                    transform: 'translateY( -50% )',
                                    cursor: 'pointor',
                                    color: '#00bcd4',
                                    '&:hover': {
                                        color: '#6a1b9a',
                                    },
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleOpenBackdrop();
                                    console.log(`You clicked to add the item ${item.page_id} to a new container`);
                                }}
                            />
                        ) : null}
                    </Card>
                </Link>
            ))}
            { backdrop && (
            <Backdrop 
                open = { backdrop }
                onClick = { handleCloseBackdrop }
                sx = {{
                    color: '#212121'
                }}
            >
                <Box 
                    component = 'form'
                    sx = {{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        backgroundColor: '#212121',
                        border: '.2rem solid #00bcd4',
                        borderRadius: '.6rem',
                        padding: '2rem'
                    }}
                >
                    <Typography 
                        variant = 'h2'
                        color = '#00bcd4'
                        sx = {{
                            textAlign: 'center',
                            marginTop: '2rem',
                            marginBottom: '4rem'
                        }}
                    >
                        Create New Container 
                    </Typography>
                    <Select
                        value = { selectedContainer }
                        onChange = { ( e ) => setSelectedContainer( e.target.value ) }
                        sx = {{
                            display: 'flex',
                            justifyContent: 'center',
                            border: '.2rem solid #00bcd4'
                        }}
                    >

                    </Select>
                    <TextField 
                        label = 'Container Name'
                        name = 'container'
                        sx = {{
                            display: 'flex',
                            justifyContent: 'center',
                            border: '.2rem solid #00bcd4',
                            marginTop: '1rem'
                        }}
                    >

                    </TextField>
                </Box>
            </Backdrop>
            )}
        </div>
    )
}

export default Bookmark;