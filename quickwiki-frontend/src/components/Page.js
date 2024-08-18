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


// Page Component 
function Page(){

    const { title } = useParams();
    const [ pageData, setPageData ] = useState( null );
    const [ htmlData, setHtmlData ] = useState( '' ); 
    const [ loading, setLoading ] = useState( true );
    const [ backdrop, setBackdrop ] = useState( false );
    const [ selectedGroup, setSelectedGroup ] = useState( '' );
    const [ initialGroupInformation, setInitialGroupInformation ] = useState({
        groupName: '',
        groupImage: '',
        groupNotes: ''
    });
    const [ groupInformation, setGroupInformation ] = useState( initialGroupInformation );
    const { displayAlert } = useAlert();
    
    useEffect(() => {
        const fetchPageData = async () => {
            try {
                const response = await apiClient.get(`/search/page/${title}`);
                setPageData(response.data.data);
                setHtmlData(response.data.html);
                setLoading( false );
            } catch (error) {
                console.error(`Error fetching page data: `, error);
            }
        };

        fetchPageData();
    }, [title]);

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

    const addBookmarkAndGroup = async () => {
        try {
            const response = await apiClient.post(`/user/bookmark/add/${title}`, {
                ...groupInformation
            });
            displayAlert(`${title} was added to your bookmark list!`, 'success');
            if (response.data.message.includes('created')) {
                displayAlert(`${groupInformation.groupName} group was successfully created and ${title} was added!`, 'success');
            }
            else {
                displayAlert( `${ title } was added to your bookmark list!`, 'success' );
            }
            handleCloseBackdrop();
            console.log(response.data);
        } catch (error) {
            console.error(`Error adding bookmark or creating group!`, error);
            displayAlert('Must be logged in to Bookmark Pages', 'error');
        }
    };

    const handleInputChange = ( field, value ) => {
        setGroupInformation( previousState => ({
            ...previousState,
            [ field ]: value
        }));
    };

    const handleSubmit = ( e ) => {
        e.preventDefault();
        addBookmarkAndGroup();
        console.log( 'You just clicked Create!!!!' );
    }

    const handleOpenBackdrop = () => {
        setBackdrop( true );
    }

    const handleCloseBackdrop = () => {
       setBackdrop( false );
       setGroupInformation( initialGroupInformation );
    }

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
                    variant = 'indeterminate'
                    color="secondary"
                    size = { 180 }
                    thickness = { 2 }
                    sx = {{
                        marginTop: '20rem'
                    }}
                    />
            ) : (
                pageData && (
                    <Card 
                        sx={{
                            backgroundColor: '#212121',
                            margin: '12rem',
                            padding: '2rem',
                            width: '100%', 
                            position: 'relative'
                        }}
                    >
                        <CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: '2rem',
                                }}
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
                                    className = 'button-container'
                                    style = {{
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
                                        marginLeft: '',
                                        '&:hover': {
                                            border: '.2rem solid #00bcd4',
                                            color: '#00bcd4',
                                            fontSize: 'large'
                                        },
                                    }}
                                    onClick = { addBookmarkAndGroup }
                                    >
                                <BookmarkIcon
                                    fontSize = 'large'
                                    sx = {{
                                        marginBottom: '.4rem'
                                    }}
                                    ></BookmarkIcon> Bookmark
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
                                    onClick = { handleOpenBackdrop }
                                >
                                <AddBoxIcon
                                    fontSize = 'large'
                                    sx = {{
                                        marginBottom: '.4rem'
                                    }}
                                ></AddBoxIcon> Add to Group
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
                    onClick = { ( e ) => {
                        if( e.target === e.currentTarget ){
                            handleCloseBackdrop();
                        }
                    }}
                    sx = {{
                        color: '#212121'
                    }}
                >

<Box
                        component='form'
                        onSubmit = { handleSubmit }
                        onClick={(e) => e.stopPropagation()}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            backgroundColor: '#212121',
                            border: '.2rem solid #00bcd4',
                            borderRadius: '.6rem',
                            padding: '3rem'
                        }}
                    >
                        <Typography
                            variant='h2'
                            color='#00bcd4'
                            sx={{
                                textAlign: 'center',
                                marginTop: '2rem',
                                marginBottom: '4rem'
                            }}
                        >
                            Create / Add Group
                        </Typography>

                        <FormControl
                            sx={{
                                marginTop: '1rem',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderWidth: '.2rem',
                                        borderColor: '#00bcd4',
                                    },
                                    '&:hover fieldset': {
                                        borderWidth: '.2rem',
                                        borderColor: '#00bcd4',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderWidth: '.2rem',
                                        borderColor: '#00bcd4',
                                    }
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#00bcd4',
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#00bcd4'
                                },
                                '& .MuiSelect-root': {
                                    color: '#00bcd4',
                                },
                                '& .MuiSvgIcon-root': {
                                    color: '#00bcd4',
                                },
                                '& .MuiPaper-root': {
                                    backgroundColor: '#424242',
                                    color: '#00bcd4',
                                },
                            }}
                        >
                            <InputLabel> Select Existing Group </InputLabel>
                            <Select
                                label = "Select Existing Group"
                                value = { selectedGroup }
                                onChange ={ (e) => setSelectedGroup(e.target.value) }
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    borderRadius: '.3rem',
                                    color: '#00bcd4'
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            bgcolor: '#424242',
                                        },
                                    },
                                }}
                            >
                                <MenuItem
                                    value=''
                                    disabled
                                    sx={{
                                        color: '#00bcd4',
                                        '&:hover': {
                                            backgroundColor: '#00bcd4',
                                            color: '#212121',
                                        }
                                    }}
                                >
                                    Select Existing Group
                                </MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            label='Group Name'
                            name='group-name'
                            placeholder='Ex: Super cool articles'
                            value={groupInformation.groupName}
                            onChange={(e) => handleInputChange('groupName', e.target.value)}
                            sx={{
                                marginTop: '1rem',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderWidth: '.2rem',
                                        borderColor: '#00bcd4',
                                    },
                                    '&:hover fieldset': {
                                        borderWidth: '.2rem',
                                        borderColor: '#00bcd4',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderWidth: '.2rem',
                                        borderColor: '#00bcd4',
                                    }
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#00bcd4',
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#00bcd4'
                                },
                                '& .MuiInputBase-input': {
                                    color: '#00bcd4'
                                }
                            }}
                            InputLabelProps={{
                                style: {
                                    color: '#00bcd4'
                                }
                            }}
                            inputProps={{
                                sx: {
                                    '::placeholder': {
                                        color: '#00bcd4',
                                        opacity: 1,
                                    }
                                }
                            }}
                        />
                        <TextField
                            label='Group Image URL'
                            name='group-image-url'
                            placeholder='Ex: www.coolimages.com'
                            value={groupInformation.groupImage}
                            onChange={(e) => handleInputChange('groupImage', e.target.value)}
                            sx={{
                                marginTop: '1rem',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderWidth: '.2rem',
                                        borderColor: '#00bcd4',
                                    },
                                    '&:hover fieldset': {
                                        borderWidth: '.2rem',
                                        borderColor: '#00bcd4',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderWidth: '.2rem',
                                        borderColor: '#00bcd4',
                                    }
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#00bcd4',
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#00bcd4'
                                },
                                '& .MuiInputBase-input': {
                                    color: '#00bcd4'
                                }
                            }}
                            InputLabelProps={{
                                style: {
                                    color: '#00bcd4'
                                }
                            }}
                            inputProps={{
                                sx: {
                                    '::placeholder': {
                                        color: '#00bcd4',
                                        opacity: 1,
                                    }
                                }
                            }}
                        />
                        <TextField
                            label='Group Notes'
                            name='group-notes'
                            placeholder='Ex: These articles are very interesting'
                            value={groupInformation.groupNotes}
                            onChange={(e) => handleInputChange('groupNotes', e.target.value)}
                            sx={{
                                marginTop: '1rem',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderWidth: '.2rem',
                                        borderColor: '#00bcd4',
                                    },
                                    '&:hover fieldset': {
                                        borderWidth: '.2rem',
                                        borderColor: '#00bcd4',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderWidth: '.2rem',
                                        borderColor: '#00bcd4',
                                    }
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#00bcd4',
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#00bcd4'
                                },
                                '& .MuiInputBase-input': {
                                    color: '#00bcd4'
                                }
                            }}
                            InputLabelProps={{
                                style: {
                                    color: '#00bcd4'
                                }
                            }}
                            inputProps={{
                                sx: {
                                    '::placeholder': {
                                        color: '#00bcd4',
                                        opacity: 1,
                                    }
                                }
                            }}
                        />
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                marginTop: '2rem'
                            }}
                        >
                            <Button
                                variant='outlined'
                                sx={{
                                    backgroundColor: '#212121',
                                    border: '.2rem solid #212121',
                                    color: '#00bcd4',
                                    fontSize: 'large',
                                    '&:hover': {
                                        border: '.2rem solid #00bcd4',
                                        color: '#00bcd4',
                                        fontSize: 'large'
                                    },
                                }}
                                onClick={ handleSubmit }
                            >
                                Create
                            </Button>
                            <Button
                                variant='outlined'
                                sx={{
                                    backgroundColor: '#212121',
                                    border: '.2rem solid #212121',
                                    color: '#00bcd4',
                                    fontSize: 'large',
                                    marginLeft: '1rem',
                                    '&:hover': {
                                        border: '.2rem solid #00bcd4',
                                        color: '#00bcd4',
                                        fontSize: 'large'
                                    },
                                }}
                                onClick={handleCloseBackdrop}
                            >
                                Cancel
                            </Button>
                        </div>
                    </Box>
                </Backdrop>
            )}
        </div>
    );
}


export default Page;