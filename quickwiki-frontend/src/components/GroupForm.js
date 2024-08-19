// Group Creation Form Component Implememntation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';


// Components & Necessary Files 
import apiClient from '../api/apiClient';
import { useAlert } from './ContextDirectory.js/AlertContext';


// Group Creation Form Component 
function GroupForm({ handleCloseBackdrop, existingGroups }) {

    const [ groups, setGroups ] = useState([]);
    const [ selectedGroup, setSelectedGroup ] = useState('');
    const [ groupInformation, setGroupInformation ] = useState({
        groupName: '',
        groupImage: '',
        groupNotes: ''
    });

    useEffect(() => {
        if (existingGroups.length > 0) {
            setSelectedGroup(existingGroups[0].id); 
        }
    }, [existingGroups]);

    useEffect( () => {
        async function fetchGroups() {
            try{
                const response = await apiClient.get( '/user/bookmark/groups' );
                setGroups( response.data.data );
            }
            catch( error ){
                console.error( 'Error fetching Bookmark Groups!' );
            }
        }
        fetchGroups();
    }, []);

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        try{
            const { groupName, groupImage, groupNotes } = groupInformation;
            const response = await apiClient.post( '/user/bookmark/add', {
                groupName,
                groupImage,
                groupNotes
            });
            console.log( response.data );
        }
        catch( error ){
            console.error( 'Error adding Bookmark to group!' );
        }
    }

    const handleInputChange = ( field, value ) => {
        setGroupInformation(( previousState ) => ({
            ...previousState,
            [ field ]: value
        }));
    };

    return (
        <div
            className='groupform-container'
        >
            <Box
                component='form'
                onSubmit={handleSubmit}
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
                        label="Select Existing Group"
                        value={selectedGroup}
                        onChange={(e) => setSelectedGroup(e.target.value)}
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
                                    color: '#00bcd4', 
                                    '& .MuiMenuItem-root': {
                                        color: '#00bcd4',
                                    },
                                    '& .MuiMenuItem-root:hover': {
                                        bgcolor: '#616161', 
                                    }
                                },
                            },
                            MenuListProps: {
                                sx: {
                                    padding: 0,
                                }
                            }
                        }}
                    >
                        {groups.map((group) => (
                        <MenuItem key={group.id} value={group.id}>
                            {group.name}
                        </MenuItem>
                    ))}
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
                        onClick={handleSubmit}
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
        </div>
    )
}

export default GroupForm;