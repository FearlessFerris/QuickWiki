// Bookmark Component Implementation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Alert, Backdrop, Box, Button, Card, CardContent, CardMedia, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, Typography, } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';


// Components & Necessary Files 
import apiClient from '../api/apiClient';
import { useAlert } from './ContextDirectory.js/AlertContext';
import GroupForm from './GroupForm';


function Bookmark() {

    const [ bookmarks, setBookmarks ] = useState([]);
    const [ isEditing, setIsEditing ] = useState(false);
    const [ isAdding, setIsAdding ] = useState( false );
    const [ backdrop, setBackdrop ] = useState( false );
    const [ selectedGroup, setSelectedGroup ] = useState( '' );
    const [ groupData, setGroupData ] = useState([]);
    const [ visibleIndexes, setVisibleIndexes ] = useState([]);
    const [ initialGroupInformation, setInitialGroupInformation ] = useState({
        groupName: '',
        groupImage: '',
        groupNotes: ''
    }); 
    const [ groupInformation, setGroupInformation ] = useState( initialGroupInformation );
    const { displayAlert } = useAlert();

    const fetchBookmarks = async () => {
        try {
            const response = await apiClient.get('/user/bookmark');
            setBookmarks(response.data.data);
            console.log(response.data);
        }
        catch (error) {
            console.error(`Error Fetching User Bookmarks`);
        }
    };

    const fetchGroups = async () => {
        try {
            const response = await apiClient.get('/user/bookmark/groups');
            setGroupData(response.data.data); 
        } catch (error) {
            console.error('Error fetching Bookmark Groups!');
        }
    };

    useEffect(() => {
        fetchBookmarks();
        fetchGroups(); 
    }, []);

    useEffect( () => {
        bookmarks.forEach(( _, index ) => {
            setTimeout( () => {
                setVisibleIndexes( previous => [ ...previous, index ]);
            }, index * 400 );
        });
    }, [ bookmarks ]);

    const addBookmarkAndGroup = async ( pageId ) => {
        try {
            const payload = {
                title: pageId
            };
            if ( groupInformation.groupName.trim() !== '' ) {
                payload.groupName = groupInformation.groupName;
                payload.groupImage = groupInformation.groupImage;
                payload.groupNotes = groupInformation.groupNotes;
            }
            const response = await apiClient.post('/user/bookmark/add', payload);
            displayAlert(`${ pageId } was successfully added to your Bookmarks${payload.groupName ? ' and group' : ''}!`, 'success');
            handleCloseBackdrop(); 
        } catch (error) {
            console.error('Error adding page to Bookmarks and Group!!!');
            displayAlert(`Error adding ${ pageId } to your Bookmarks${groupInformation.groupName ? ' and Group' : ''}!`, 'error');
        }
    }

    const handleRemoveBookmark = async ( pageId ) => {
        try{
            const response = await apiClient.delete( `/user/bookmark/remove/${ pageId }` );
            setBookmarks(( previousBookmarks ) => previousBookmarks.filter(( bookmark ) => bookmark.page_id !== pageId ));
            displayAlert( `${ pageId } was successfully removed from Bookmarks!`, 'success' );
        }
        catch( error ){
            console.error( 'Error removing bookmark!!!' );
            displayAlert( `Error removing ${ pageId } from your Bookmarks!`, 'error' );
        }
    } 

    const handleIsEditing = () => {
        setIsEditing(!isEditing);
    }

    const handleIsAdding = () => {
        setIsAdding( !isAdding );
    }

    const handleOpenBackdrop = () => {
        setBackdrop( true );
    }

    const handleCloseBackdrop = () => {
        setBackdrop( false );
        setGroupInformation( initialGroupInformation );
    }

    return (
        <div className='bookmark-container'>
            <Box
                sx={{
                    backgroundColor: '#212121',
                    border: '.2rem solid #00bcd4',
                    borderRadius: '.6rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginTop: '8rem',
                    marginBottom: '2rem',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4), 0px 2px 4px rgba(0, 0, 0, 0.2)'
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
                        className='button-container'
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginBottom: '2rem'
                        }}
                    >
                        <Button
                            variant='outlined'
                            sx={{
                                backgroundColor: '#212121',
                                border: '.2rem solid #212121',
                                color: '#00bcd4',
                                fontSize: 'large',
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
                ) : (
                    <div
                        className='button-container'
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginBottom: '2rem'
                        }}
                    >
                        <Button
                            variant='outlined'
                            sx={{
                                backgroundColor: '#212121',
                                border: '.2rem solid #212121',
                                color: '#00bcd4',
                                fontSize: 'large',
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
                    </div>
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
                        className={`bookmark-card ${visibleIndexes.includes(index) ? 'visible' : ''}`}
                        sx={{
                            position: 'relative',
                            borderRadius: '1rem',
                            backgroundColor: '#212121',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '1rem',
                            padding: '1rem',
                            width: '36rem',
                            height: '2rem',
                            flexGrow: 1,
                            opacity: visibleIndexes.includes(index) ? 1 : 0,
                            transform: visibleIndexes.includes(index) ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'opacity 0.6s ease, transform 0.6s ease',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)'
                        }}
                    >
                        {isEditing && (
                            <>
                                <RemoveCircleOutline
                                    sx={{
                                        position: 'absolute',
                                        left: '1rem', 
                                        top: '50%',
                                        transform: 'translateY(-50%)', 
                                        fontSize: '3rem',
                                        cursor: 'pointer',
                                        color: '#00bcd4',
                                        '&:hover': {
                                            color: '#6a1b9a',
                                        },
                                    }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleRemoveBookmark( item.page_id );
                                    }}
                                />
                                <AddCircleOutline
                                    sx={{
                                        position: 'absolute',
                                        right: '1rem', 
                                        top: '50%',
                                        transform: 'translateY(-50%)', 
                                        fontSize: '3rem',
                                        cursor: 'pointer',
                                        color: '#00bcd4',
                                        '&:hover': {
                                            color: '#6a1b9a',
                                        },
                                    }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setSelectedGroup( item.page_id );
                                        handleOpenBackdrop();
                                        console.log(`You clicked to add something related to the ${item.page_id} bookmark!`);
                                    }}
                                />
                            </>
                        )}
                        <CardContent>
                            <Typography
                                variant='h4'
                                color='#00bcd4'
                                sx={{
                                    textAlign: 'center',
                                    marginTop: '2rem',
                                    marginBottom: '2rem'
                                }}
                            >
                                {item.page_id}
                            </Typography>
                        </CardContent>
                    </Card>
                </Link>
            ))}
            { backdrop && (
                <Backdrop 
                    open = { backdrop }
                    sx = {{
                        color: '#212121',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onClick = { ( e ) => {
                        if( e.target === e.currentTarget ){
                            handleCloseBackdrop();
                        }
                    }}
                >
                    <GroupForm handleCloseBackdrop = { handleCloseBackdrop }  existingGroups = { groupData }  /> 
                </Backdrop>
            )}
        </div>
    );
}

export default Bookmark;
