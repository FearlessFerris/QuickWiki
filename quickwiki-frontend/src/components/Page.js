// Page Component Implementation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Alert, Backdrop, Box, Button, Card, CardContent, CardMedia, CircularProgress, FormControl, InputLabel, LinearProgress, MenuItem, Select, TextField, Typography, } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { parse } from 'node-html-parser';


// Components & Necessary Files 
import apiClient from '../api/apiClient';
import { useAlert } from './ContextDirectory.js/AlertContext';
import GroupForm from './GroupForm';


// Page Component 

function Page() {
    const { title } = useParams();
    const [pageData, setPageData] = useState(null);
    const [htmlData, setHtmlData] = useState('');
    const [loading, setLoading] = useState(true);
    const [backdrop, setBackdrop] = useState(false);
    const [ groupData, setGroupData ] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [initialGroupInformation, setInitialGroupInformation] = useState({
        groupName: '',
        groupImage: '',
        groupNotes: ''
    });
    const [groupInformation, setGroupInformation] = useState(initialGroupInformation);
    const { displayAlert } = useAlert();

    const fetchPageData = async () => {
        try {
            const response = await apiClient.get(`/search/page/${title}`);
            setPageData(response.data.data);
            setHtmlData(response.data.html);
            setLoading(false);
        } catch (error) {
            console.error(`Error fetching page data: `, error);
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
        fetchPageData();
        fetchGroups(); 
    }, []);

    const transformHtmlLinks = (html) => {
        const root = parse(html);
        root.querySelectorAll('a').forEach((anchor) => {
            let href = anchor.getAttribute('href');
            if (href && href.startsWith('/search/page/')) {
                anchor.setAttribute('href', href);
                anchor.setAttribute('target', '_self');
            } else if (href && href.startsWith('http')) {
                anchor.setAttribute('target', '_blank');
                anchor.setAttribute('rel', 'noopener noreferrer');
            }
        });
        return root.toString();
    };

    const addBookmark = async () => {
        try{
            const response = await apiClient.post( '/user/bookmark/add', {
                title
            });
            displayAlert( `${ title } was successfully added to Bookmarks`, 'success' );
        }
        catch( error ){
            console.error( `Error adding ${ title } to Bookmarks` );
            displayAlert( `${ title }, is already in Bookmarks`, 'error' );
        }
    }

    const handleGroupCreated = ( groupName, title = '' ) => {
        if( !groupName && !title ){        
            return;
        }
        displayAlert( `${ groupName } was successfully created!`, 'success' );
        handleCloseBackdrop();
    }

    const handleGroupAdded = ( title, selectedGroupName ) => {
        displayAlert( `${ title } was successfully added to ${ selectedGroupName }`, 'success' );
        handleCloseBackdrop(); 
    }
    
    const handleInputChange = (field, value) => {
        setGroupInformation(previousState => ({
            ...previousState,
            [field]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addBookmark();
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
            className='page-container'
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            {loading ? (
                <CircularProgress
                    variant='indeterminate'
                    color="secondary"
                    size={180}
                    thickness={2}
                    sx={{
                        marginTop: '20rem'
                    }}
                />
            ) : (
                pageData && (
                    <Card
                        sx={{
                            backgroundColor: '#212121',
                            marginLeft: '20rem',
                            marginRight: '20rem',
                            marginTop: '12rem',
                            marginBottom: '10rem',
                            padding: '2rem',
                            width: '100%',
                            position: 'relative'
                        }}
                    >
                        <CardContent>
                            <Box
                                component = 'form'
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: '2rem',
                                }}
                                onSubmit = { handleSubmit }
                            >
                                <Typography
                                    variant='h1'
                                    sx={{
                                        textAlign: 'center',
                                        color: '#00bcd4',
                                    }}
                                >
                                    {pageData.title}
                                </Typography>

                                <div
                                    className='button-container'
                                    style={{
                                        alignItems: 'center',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        marginLeft: 'auto'
                                    }}
                                >
                                    <Button
                                        variant='outlined'
                                        sx={{
                                            backgroundColor: '#212121',
                                            border: '.2rem solid #212121',
                                            color: '#00bcd4',
                                            fontSize: 'large',
                                            width: '15rem',
                                            '&:hover': {
                                                border: '.2rem solid #00bcd4',
                                                color: '#00bcd4',
                                                fontSize: 'large'
                                            },
                                        }}
                                        onClick={addBookmark}
                                    >
                                        <BookmarkIcon
                                            fontSize='large'
                                            sx={{
                                                marginBottom: '.4rem'
                                            }}
                                        /> Bookmark
                                    </Button>
                                    <Button
                                        variant='outlined'
                                        sx={{
                                            backgroundColor: '#212121',
                                            border: '.2rem solid #212121',
                                            color: '#00bcd4',
                                            fontSize: 'large',
                                            width: '15rem',
                                            marginLeft: 'auto',
                                            '&:hover': {
                                                border: '.2rem solid #00bcd4',
                                                color: '#00bcd4',
                                                fontSize: 'large'
                                            },
                                        }}
                                        onClick={handleOpenBackdrop}
                                    >
                                        <AddBoxIcon
                                            fontSize='large'
                                            sx={{
                                                marginBottom: '.4rem'
                                            }}
                                        /> Add to Group
                                    </Button>
                                </div>
                            </Box>
                            <Box
                                className='page-content'
                                sx={{
                                    color: '#bdbdbd',
                                    lineHeight: '1.6',
                                    '& p': {
                                        margin: '1rem 0',
                                    },
                                    '& img': {
                                        maxWidth: '100%',
                                        borderRadius: '0.5rem',
                                        margin: '1rem 0',
                                    },
                                    '& a': {
                                        color: '#00bcd4',
                                        textDecoration: 'none',
                                    },
                                }}
                                dangerouslySetInnerHTML={{ __html: transformHtmlLinks(htmlData) }}
                            />
                        </CardContent>
                    </Card>
                )
            )}
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
                    <GroupForm 
                        handleCloseBackdrop = { handleCloseBackdrop }
                        existingGroups = { groupData }
                        title = { title }
                        handleGroupCreated = { handleGroupCreated }
                        handleGroupAdded = { handleGroupAdded }
                    /> 
                </Backdrop>
            )}
        </div>
    );
}

export default Page;
