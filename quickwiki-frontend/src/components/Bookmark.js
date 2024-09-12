// Bookmark Component Implementation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Card, CardContent, CardMedia, Typography, Backdrop } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';


// Components & Necessary Files
import apiClient from '../api/apiClient';
import { useAlert } from './ContextDirectory.js/AlertContext';
import GroupForm from './GroupForm';


function Bookmark() {

    const [bookmarks, setBookmarks] = useState([]);
    const [isShowingBookmark, setIsShowingBookmark] = useState(true);
    const [isEditingBookmark, setIsEditingBookmark] = useState(false);
    const [isShowingGroup, setIsShowingGroup] = useState(false);
    const [isEditingGroup, setIsEditingGroup] = useState(false);
    const [backdrop, setBackdrop] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [groupData, setGroupData] = useState([]);
    const [visibleIndexes, setVisibleIndexes] = useState([]);
    const [initialGroupInformation] = useState({
        groupName: '',
        groupImage: '',
        groupNotes: ''
    });
    const [groupInformation, setGroupInformation] = useState(initialGroupInformation);
    const { displayAlert } = useAlert();

    const fetchBookmarks = async () => {
        try {
            const response = await apiClient.get('/user/bookmark');
            setBookmarks(response.data.data);
        } catch (error) {
            console.error(`Error Fetching User Bookmarks`);
        }
    };

    const fetchGroups = async () => {
        try {
            const response = await apiClient.get('/user/bookmark/groups');
            const groups = [{ id: '', name: 'None' }, ...response.data.data];
            setGroupData(groups);
        } catch (error) {
            console.error('Error fetching Bookmark Groups!');
        }
    };

    useEffect(() => {
        fetchBookmarks();
        fetchGroups();
    }, []);

    useEffect(() => {
        bookmarks.forEach((_, index) => {
            setTimeout(() => {
                setVisibleIndexes(previous => [...previous, index]);
            }, index * 400);
        });
    }, [bookmarks]);

    useEffect(() => {
        groupData.forEach((_, index ) => {
            setTimeout(() => {
                setVisibleIndexes( previous => [...previous, index ]);
            }, index * 400 );
        });
    }, [ groupData ]);

    const handleGroupCreated = ( groupName, title = '' ) => {
        if( !groupName && !title ){        
            return;
        }
        displayAlert( `${ groupName } was successfully created!`, 'success' );
        handleCloseBackdrop();
    }

    const handleGroupAdded = ( selectedGroupName, title ) => {
        displayAlert( `${ title } was successfully added to ${ selectedGroupName }` );
        handleCloseBackdrop(); 
    }

    const handleRemoveBookmark = async (pageId) => {
        try {
            await apiClient.delete(`/user/bookmark/remove/${pageId}`);
            setBookmarks((previousBookmarks) => previousBookmarks.filter((bookmark) => bookmark.page_id !== pageId));
            displayAlert(`${pageId} was successfully removed from Bookmarks!`, 'success');
        } catch (error) {
            console.error('Error removing bookmark!!!');
            displayAlert(`Error removing ${pageId} from your Bookmarks!`, 'error');
        }
    };

    const handleRemoveBookmarkGroup = async (name) => {
        try {
            await apiClient.delete(`/user/bookmark/groups/remove/${name}`);
            setGroupData((prevGroups) => prevGroups.filter((group) => group.name !== name));
            displayAlert(`${name} group was successfully removed!`, 'success');
        } catch (error) {
            console.error('Error removing bookmark group');
            displayAlert(`Error removing ${name} group!`, 'error');
        }
    };

    const handleIsEditingBookmark = () => {
        setIsEditingBookmark((previousSetting) => !previousSetting);
    };

    const handleIsEditingGroup = () => {
        setIsEditingGroup(!isEditingGroup);
    };

    const handleIsShowingBookmark = () => {
        setIsShowingBookmark(!isShowingBookmark);
    };

    const handleOpenBackdrop = () => {
        setBackdrop(true);
    };

    const handleCloseBackdrop = () => {
        setBackdrop(false);
        setGroupInformation(initialGroupInformation);
    };

    return (
        <div
            className='bookmark-container'
            style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                padding: '0'
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
                    marginTop: '12rem',
                    marginBottom: '2rem',
                    width: '36rem',
                    minWidth: '36rem',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4), 0px 2px 4px rgba(0, 0, 0, 0.2)',
                    padding: '1rem'
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
                {isShowingBookmark ? 'Bookmarks' : 'Groups'}
                </Typography>

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
                        variant='filled'
                        sx={{
                            backgroundColor: '#212121',
                            border: '.2rem solid #212121',
                            color: '#00bcd4',
                            fontSize: 'large',
                            marginRight: '2rem',
                            width: '8.5rem',
                            '&:hover': {
                                border: '.2rem solid #00bcd4',
                                backgroundColor: '#00bcd4',
                                color: '#212121',
                                fontSize: 'large'
                            },
                        }}
                        onClick={isShowingBookmark ? handleIsEditingBookmark : handleIsEditingGroup}
                    >
                        {isShowingBookmark ? (isEditingBookmark ? 'Done' : 'Edit') : (isEditingGroup ? 'Done' : 'Edit')}
                    </Button>
                    <Button
                        variant='filled'
                        sx={{
                            backgroundColor: '#212121',
                            border: '.2rem solid #212121',
                            color: '#00bcd4',
                            fontSize: 'large',
                            width: '8.5rem',
                            '&:hover': {
                                border: '.2rem solid #00bcd4',
                                backgroundColor: '#00bcd4',
                                color: '#212121',
                                fontSize: 'large'
                            },
                        }}
                        onClick={handleIsShowingBookmark}
                    >
                        {isShowingBookmark ? 'Groups' : 'Bookmarks'}
                    </Button>
                </div>
            </Box>

            {isShowingBookmark ? (
                <div>
                    {bookmarks.map((item, index) => (
                        <Link
                            to={`/search/page/${item.page_id}`}
                            key={index}
                            style={{ textDecoration: 'none' }}
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
                                    width: '34rem',
                                    height: '3rem',
                                    opacity: visibleIndexes.includes(index) ? 1 : 0,
                                    transform: visibleIndexes.includes(index) ? 'translateY(0)' : 'translateY(20px)',
                                    transition: 'opacity 0.6s ease, transform 0.6s ease',
                                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)'
                                }}
                            >
                                {isEditingBookmark && (
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
                                                '&:hover': { color: '#6a1b9a' },
                                            }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleRemoveBookmark(item.page_id);
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
                                                '&:hover': { color: '#6a1b9a' },
                                            }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setSelectedGroup(item.page_id);
                                                handleOpenBackdrop();
                                            }}
                                        />
                                    </>
                                )}
                                <CardContent
                                    sx = {{
                                        alignItems: 'center',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        flexGrow: 1,
                                        justifyContent: 'center',
                                        overflow: 'hidden',
                                        maxWidth: '80%',
                                        marginTop: '1rem',
                                        padding: 0,
                                    }}
                                >
                                    <Typography
                                        variant='h4'
                                        color='#00bcd4'
                                        sx={{ 
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            textAlign: 'center', 
                                            maxWidth: '100%',
                                            padding: '0'
                                         }}
                                    >
                                        {item.page_id}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            ) : (
                <div>
                    {groupData.filter(item => item.name !== 'None').map((item, index) => (
                        <Link 
                            to = { `/user/bookmark/group/${ item.id }` }
                            key = { index }
                            style = {{
                                textDecoration: 'none'
                            }}
                        >

                        <Card
                            key={index}
                            className={`group-card ${visibleIndexes.includes(index) ? 'visible' : ''}`}
                            sx={{
                                position: 'relative',
                                borderRadius: '1rem',
                                backgroundColor: '#212121',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'start',
                                margin: '1rem',
                                padding: '1rem',
                                width: '34rem',
                                height: '8rem',
                                opacity: visibleIndexes.includes(index) ? 1 : 0,
                                transform: visibleIndexes.includes(index) ? 'translateY(0)' : 'translateY(20px)',
                                transition: 'opacity 0.6s ease, transform 0.6s ease',
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)',
                            }}
                            >
                            {isEditingGroup && (
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
                                            '&:hover': { color: '#6a1b9a' },
                                        }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleRemoveBookmarkGroup(item.name);
                                        }}
                                        />
                                </>
                            )}
                            <CardMedia
                                component='img'
                                src={item.image_url}
                                alt={item.name}
                                sx={{
                                    borderRadius: '5%',
                                    width: '6rem',
                                    height: '6rem',
                                    marginRight: '2rem',
                                    marginLeft: '4rem'
                                }}
                                />
                            <CardContent>
                                <Typography
                                    variant='h4'
                                    color='#00bcd4'
                                    sx={{ textAlign: 'center', marginTop: '2rem', marginBottom: '2rem' }}
                                    >
                                    {item.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Link>
                    ))}
                </div>
            )}
            
            <Backdrop
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
                open={backdrop}
                onClick={handleCloseBackdrop}
            >
                <GroupForm
                    handleCloseBackdrop = { handleCloseBackdrop }
                    existingGroups = { groupData }
                    title = { selectedGroup }
                    handleGroupCreated = { handleGroupCreated }
                    handleGroupAdded = { handleGroupAdded }
                />
            </Backdrop>
        </div>
    );
}

export default Bookmark;
