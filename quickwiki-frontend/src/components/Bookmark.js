// Bookmark Component Implementation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Alert, Backdrop, Box, Button, Card, CardContent, CardMedia, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, Typography, } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';


// Components & Necessary Files 
import apiClient from '../api/apiClient';
import { useAlert } from './ContextDirectory.js/AlertContext';


// // Bookmark Component 
// function Bookmark() {

//     const { title } = useParams();
//     const [bookmarks, setBookmarks] = useState([]);
//     const [visibleBookmarks, setVisibleBookmarks] = useState(new Set());
//     const [hoveredIndex, setHoveredIndex] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [isSorting, setIsSorting] = useState(false);
//     const [backdrop, setBackdrop] = useState(false);
//     const [selectedGroup, setSelectedGroup] = useState('');
//     const initialGroupInformation = {
//         groupName: '',
//         groupImage: '',
//         groupNotes: ''
//     }
//     const [groupInformation, setGroupInformation] = useState(initialGroupInformation);
//     const { displayAlert } = useAlert();


//     useEffect(() => {
//         fetchBookmarks();
//     }, []);

//     const fetchBookmarks = async () => {
//         try {
//             const response = await apiClient.get('/user/bookmark');
//             const filteredBookmarks = response.data.data.filter(bookmark => !bookmark.groupId);
//             setBookmarks(filteredBookmarks);
//             response.data.data.forEach((item, index) => {
//                 setTimeout(() => {
//                     setVisibleBookmarks(prev => new Set(prev).add(index));
//                 }, index * 200);
//             });
//         } catch (error) {
//             console.error('Error loading user bookmarks!', error);
//         }
//     };

//     const handleRemoveBookmark = async (pageId) => {
//         try {
//             const response = await apiClient.delete(`/user/bookmark/remove/${pageId}`);
//             setBookmarks(previousBookmarks => previousBookmarks.filter(bookmark => bookmark.page_id !== pageId));
//             const page = response.data.data;
//             displayAlert(`${page}, was successfully removed from your bookmarks!`, 'success');
//         }
//         catch (error) {
//             console.log(`Error removing bookmarked item`, error);
//         }
//     }

//     const handleAddToGroup = async ( groupInformation ) => {
//         try {
//             const { groupName, groupImage, groupNotes } = groupInformation;
//             console.log( `Title: ${ title }` );
//             const response = await apiClient.post(`/user/bookmark/add/${title}`, {
//                 groupName,
//                 groupImage,
//                 groupNotes
//             });
//             console.log(response.data);
//             if (response.status === 200) {
//                 fetchBookmarks();
//                 handleCloseBackdrop();
//             }
//         } catch (error) {
//             console.error('Error adding bookmark to group!', error);
//         }
//     };


//     const handleInputChange = (field, value) => {
//         setGroupInformation(previousState => ({
//             ...previousState,
//             [field]: value
//         }));
//     };

//     const handleSubmit = ( e ) => {
//         e.preventDefault();
//         handleAddToGroup( groupInformation );
//     };


//     const handleCloseBackdrop = () => {
//         setBackdrop(false);
//         setGroupInformation(initialGroupInformation);
//         console.log('You clicked close!!!');
//     }

//     const handleOpenBackdrop = () => {
//         setBackdrop(true);
//     }

//     const handleIsEditing = () => {
//         setIsEditing(!isEditing);
//     }

//     const handleIsSorting = () => {
//         setIsSorting(!isSorting);
//     }

//     const handleMouseEnter = (index) => {
//         setHoveredIndex(index);
//     }

//     const handleMouseLeave = () => {
//         setHoveredIndex(null);
//     }

//     const getCardStyle = (index) => ({
//         borderRadius: '1rem',
//         backgroundColor: '#212121',
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         margin: '1rem',
//         padding: '1rem',
//         boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)',
//         width: '36rem',
//         height: '2rem',
//         flexGrow: 1,
//         opacity: visibleBookmarks.has(index) ? 1 : 0,
//         transition: 'opacity 1s ease-out, transform 0.3s ease-out, box-shadow 0.3s ease-out',
//         transform: visibleBookmarks.has(index)
//             ? hoveredIndex === index
//                 ? 'scale(1.07)'
//                 : 'scale(1)'
//             : 'scale(0.8)',
//         boxShadow: hoveredIndex === index
//             ? '0 6px 12px rgba(0, 0, 0, 0.2)'
//             : '0 3px 5px rgba(0, 0, 0, 0.1)',
//         color: '#00bcd4',
//     });

//     return (
//         <div
//             className='bookmark-container'
//         >
//             <Box
//                 sx={{
//                     backgroundColor: '#212121',
//                     border: '.2rem solid #00bcd4',
//                     borderRadius: '.6rem',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'center',
//                     marginTop: '8rem',
//                     marginBottom: '2rem'
//                 }}
//             >
//                 <Typography
//                     variant='h2'
//                     color='#00bcd4'
//                     sx={{
//                         textAlign: 'center',
//                         marginTop: '2rem',
//                         marginBottom: '2rem'
//                     }}
//                 >
//                     Bookmarks
//                 </Typography>
//                 {isEditing ? (
//                     <div
//                         style={{
//                             alignItems: 'center',
//                             display: 'flex',
//                             flexDirection: 'column',
//                         }}
//                     >
//                         <Button
//                             sx={{
//                                 backgroundColor: '#212121',
//                                 border: '.2rem solid #212121',
//                                 color: '#00bcd4',
//                                 fontSize: 'large',
//                                 marginBottom: '2rem',
//                                 width: '12rem',
//                                 '&:hover': {
//                                     border: '.2rem solid #00bcd4',
//                                     color: '#00bcd4',
//                                     fontSize: 'large'
//                                 },
//                             }}
//                             onClick={handleIsEditing}
//                         >
//                             Done
//                         </Button>
//                     </div>
//                 ) : isSorting ? (
//                     <div
//                         style={{
//                             alignItems: 'center',
//                             display: 'flex',
//                             flexDirection: 'column',
//                         }}
//                     >
//                         <Button
//                             sx={{
//                                 backgroundColor: '#212121',
//                                 border: '.2rem solid #212121',
//                                 color: '#00bcd4',
//                                 fontSize: 'large',
//                                 marginBottom: '2rem',
//                                 width: '12rem',
//                                 '&:hover': {
//                                     border: '.2rem solid #00bcd4',
//                                     color: '#00bcd4',
//                                     fontSize: 'large'
//                                 },
//                             }}
//                             onClick={handleIsSorting}
//                         >
//                             Done
//                         </Button>
//                     </div>
//                 ) : (
//                     <>
//                         <div
//                             style={{
//                                 alignItems: 'center',
//                                 display: 'flex',
//                                 justifyContent: 'center',
//                                 flexDirection: 'row',
//                             }}
//                         >
//                             <Button
//                                 sx={{
//                                     backgroundColor: '#212121',
//                                     border: '.2rem solid #212121',
//                                     color: '#00bcd4',
//                                     fontSize: 'large',
//                                     marginBottom: '2rem',
//                                     marginRight: '1rem',
//                                     width: '12rem',
//                                     '&:hover': {
//                                         border: '.2rem solid #00bcd4',
//                                         color: '#00bcd4',
//                                         fontSize: 'large'
//                                     },
//                                 }}
//                                 onClick={handleIsEditing}
//                             >
//                                 Edit
//                             </Button>
//                             <Button
//                                 sx={{
//                                     backgroundColor: '#212121',
//                                     border: '.2rem solid #212121',
//                                     color: '#00bcd4',
//                                     fontSize: 'large',
//                                     marginBottom: '2rem',
//                                     width: '12rem',
//                                     '&:hover': {
//                                         border: '.2rem solid #00bcd4',
//                                         color: '#00bcd4',
//                                         fontSize: 'large'
//                                     },
//                                 }}
//                                 onClick={handleIsSorting}
//                             >
//                                 Sort
//                             </Button>
//                         </div>
//                     </>
//                 )}
//             </Box>
//             {bookmarks.map((item, index) => (
//                 <Link
//                     to={`/search/page/${item.page_id}`}
//                     key={index}
//                     style={{ textDecoration: 'none' }}
//                 >
//                     <Card
//                         key={index}
//                         sx={getCardStyle(index)}
//                         onMouseEnter={() => handleMouseEnter(index)}
//                         onMouseLeave={handleMouseLeave}
//                     >
//                         <Typography
//                             variant='h4'
//                             color='#00bcd4'
//                             noWrap
//                         >
//                             {item.page_id}
//                         </Typography>
//                         {isEditing ? (
//                             <RemoveCircleOutline
//                                 sx={{
//                                     position: 'absolute',
//                                     fontSize: '3rem',
//                                     right: '1rem',
//                                     top: '50%',
//                                     transform: 'translateY(-50%)',
//                                     cursor: 'pointer',
//                                     color: '#00bcd4',
//                                     '&:hover': {
//                                         color: '#6a1b9a',
//                                     },
//                                 }}
//                                 onClick={(e) => {
//                                     e.preventDefault();
//                                     console.log(`You clicked to remove the ${item.page_id} bookmark!`);
//                                     handleRemoveBookmark(item.page_id);
//                                 }}
//                             />
//                         ) : isSorting ? (
//                             <AddCircleOutline
//                                 sx={{
//                                     position: 'absolute',
//                                     fontSize: '3rem',
//                                     right: '1rem',
//                                     top: '50%',
//                                     transform: 'translateY(-50%)',
//                                     cursor: 'pointer',
//                                     color: '#00bcd4',
//                                     '&:hover': {
//                                         color: '#6a1b9a',
//                                     },
//                                 }}
//                                 onClick={(e) => {
//                                     e.preventDefault();
//                                     handleOpenBackdrop();
//                                     console.log(`You clicked to add the item ${item.page_id} to a new container`);
//                                 }}
//                             />
//                         ) : null}
//                     </Card>
//                 </Link>
//             ))}
//             {backdrop && (
//                 <Backdrop
//                     open={backdrop}
//                     onClick={(e) => {
//                         if (e.target === e.currentTarget) {
//                             handleCloseBackdrop();
//                         }
//                     }}
//                     sx={{ color: '#212121' }}
//                 >
//                     <Box
//                         component='form'
//                         onSubmit={(e) => {
//                             e.preventDefault(); // Prevent default form submission
//                             handleSubmit(e); // Ensure you handle form submission explicitly
//                         }}
//                         onClick={(e) => e.stopPropagation()}
//                         sx={{
//                             display: 'flex',
//                             flexDirection: 'column',
//                             justifyContent: 'center',
//                             backgroundColor: '#212121',
//                             border: '.2rem solid #00bcd4',
//                             borderRadius: '.6rem',
//                             padding: '3rem'
//                         }}
//                     >
//                         <Typography
//                             variant='h2'
//                             color='#00bcd4'
//                             sx={{ textAlign: 'center', marginTop: '2rem', marginBottom: '4rem' }}
//                         >
//                             Create / Add Group
//                         </Typography>

//                         <FormControl
//                             sx={{
//                                 marginTop: '1rem',
//                                 '& .MuiOutlinedInput-root': {
//                                     '& fieldset': {
//                                         borderWidth: '.2rem',
//                                         borderColor: '#00bcd4',
//                                     },
//                                     '&:hover fieldset': {
//                                         borderWidth: '.2rem',
//                                         borderColor: '#00bcd4',
//                                     },
//                                     '&.Mui-focused fieldset': {
//                                         borderWidth: '.2rem',
//                                         borderColor: '#00bcd4',
//                                     }
//                                 },
//                                 '& .MuiInputLabel-root': {
//                                     color: '#00bcd4',
//                                 },
//                                 '& .MuiInputLabel-root.Mui-focused': {
//                                     color: '#00bcd4'
//                                 },
//                                 '& .MuiSelect-root': {
//                                     color: '#00bcd4',
//                                 },
//                                 '& .MuiSvgIcon-root': {
//                                     color: '#00bcd4',
//                                 },
//                                 '& .MuiPaper-root': {
//                                     backgroundColor: '#424242',
//                                     color: '#00bcd4',
//                                 },
//                             }}
//                         >
//                             <InputLabel>Select Existing Group</InputLabel>
//                             <Select
//                                 label="Select Existing Group"
//                                 value={selectedGroup}
//                                 onChange={(e) => setSelectedGroup(e.target.value)}
//                                 sx={{
//                                     display: 'flex',
//                                     justifyContent: 'center',
//                                     borderRadius: '.3rem',
//                                     color: '#00bcd4'
//                                 }}
//                                 MenuProps={{
//                                     PaperProps: {
//                                         sx: { bgcolor: '#424242' },
//                                     },
//                                 }}
//                             >
//                                 <MenuItem
//                                     value=''
//                                     disabled
//                                     sx={{
//                                         color: '#00bcd4',
//                                         '&:hover': {
//                                             backgroundColor: '#00bcd4',
//                                             color: '#212121',
//                                         }
//                                     }}
//                                 >
//                                     Select Existing Group
//                                 </MenuItem>
//                             </Select>
//                         </FormControl>

//                         <TextField
//                             label='Group Name'
//                             name='group-name'
//                             placeholder='Ex: Super cool articles'
//                             value={groupInformation.groupName}
//                             onChange={(e) => handleInputChange('groupName', e.target.value)}
//                             sx={{
//                                 marginTop: '1rem',
//                                 '& .MuiOutlinedInput-root': {
//                                     '& fieldset': {
//                                         borderWidth: '.2rem',
//                                         borderColor: '#00bcd4',
//                                     },
//                                     '&:hover fieldset': {
//                                         borderWidth: '.2rem',
//                                         borderColor: '#00bcd4',
//                                     },
//                                     '&.Mui-focused fieldset': {
//                                         borderWidth: '.2rem',
//                                         borderColor: '#00bcd4',
//                                     }
//                                 },
//                                 '& .MuiInputLabel-root': {
//                                     color: '#00bcd4',
//                                 },
//                                 '& .MuiInputLabel-root.Mui-focused': {
//                                     color: '#00bcd4'
//                                 },
//                                 '& .MuiInputBase-input': {
//                                     color: '#00bcd4'
//                                 }
//                             }}
//                             InputLabelProps={{
//                                 style: { color: '#00bcd4' }
//                             }}
//                             inputProps={{
//                                 sx: {
//                                     '::placeholder': {
//                                         color: '#00bcd4',
//                                         opacity: 1,
//                                     }
//                                 }
//                             }}
//                         />
//                         <TextField
//                             label='Group Image URL'
//                             name='group-image-url'
//                             placeholder='Ex: www.coolimages.com'
//                             value={groupInformation.groupImage}
//                             onChange={(e) => handleInputChange('groupImage', e.target.value)}
//                             sx={{
//                                 marginTop: '1rem',
//                                 '& .MuiOutlinedInput-root': {
//                                     '& fieldset': {
//                                         borderWidth: '.2rem',
//                                         borderColor: '#00bcd4',
//                                     },
//                                     '&:hover fieldset': {
//                                         borderWidth: '.2rem',
//                                         borderColor: '#00bcd4',
//                                     },
//                                     '&.Mui-focused fieldset': {
//                                         borderWidth: '.2rem',
//                                         borderColor: '#00bcd4',
//                                     }
//                                 },
//                                 '& .MuiInputLabel-root': {
//                                     color: '#00bcd4',
//                                 },
//                                 '& .MuiInputLabel-root.Mui-focused': {
//                                     color: '#00bcd4'
//                                 },
//                                 '& .MuiInputBase-input': {
//                                     color: '#00bcd4'
//                                 }
//                             }}
//                             InputLabelProps={{
//                                 style: { color: '#00bcd4' }
//                             }}
//                             inputProps={{
//                                 sx: {
//                                     '::placeholder': {
//                                         color: '#00bcd4',
//                                         opacity: 1,
//                                     }
//                                 }
//                             }}
//                         />
//                         <TextField
//                             label='Group Notes'
//                             name='group-notes'
//                             placeholder='Ex: These articles are very interesting'
//                             value={groupInformation.groupNotes}
//                             onChange={(e) => handleInputChange('groupNotes', e.target.value)}
//                             sx={{
//                                 marginTop: '1rem',
//                                 '& .MuiOutlinedInput-root': {
//                                     '& fieldset': {
//                                         borderWidth: '.2rem',
//                                         borderColor: '#00bcd4',
//                                     },
//                                     '&:hover fieldset': {
//                                         borderWidth: '.2rem',
//                                         borderColor: '#00bcd4',
//                                     },
//                                     '&.Mui-focused fieldset': {
//                                         borderWidth: '.2rem',
//                                         borderColor: '#00bcd4',
//                                     }
//                                 },
//                                 '& .MuiInputLabel-root': {
//                                     color: '#00bcd4',
//                                 },
//                                 '& .MuiInputLabel-root.Mui-focused': {
//                                     color: '#00bcd4'
//                                 },
//                                 '& .MuiInputBase-input': {
//                                     color: '#00bcd4'
//                                 }
//                             }}
//                             InputLabelProps={{
//                                 style: { color: '#00bcd4' }
//                             }}
//                             inputProps={{
//                                 sx: {
//                                     '::placeholder': {
//                                         color: '#00bcd4',
//                                         opacity: 1,
//                                     }
//                                 }
//                             }}
//                         />
//                         <div
//                             style={{
//                                 display: 'flex',
//                                 flexDirection: 'row',
//                                 justifyContent: 'center',
//                                 marginTop: '2rem'
//                             }}
//                         >
//                             <Button
//                                 variant='outlined'
//                                 sx={{
//                                     backgroundColor: '#212121',
//                                     border: '.2rem solid #212121',
//                                     color: '#00bcd4',
//                                     fontSize: 'large',
//                                     '&:hover': {
//                                         border: '.2rem solid #00bcd4',
//                                         color: '#00bcd4',
//                                         fontSize: 'large'
//                                     },
//                                 }}
//                                 onClick={handleSubmit}
//                             >
//                                 Create
//                             </Button>
//                             <Button
//                                 variant='outlined'
//                                 sx={{
//                                     backgroundColor: '#212121',
//                                     border: '.2rem solid #212121',
//                                     color: '#00bcd4',
//                                     fontSize: 'large',
//                                     marginLeft: '1rem',
//                                     '&:hover': {
//                                         border: '.2rem solid #00bcd4',
//                                         color: '#00bcd4',
//                                         fontSize: 'large'
//                                     },
//                                 }}
//                                 onClick={handleCloseBackdrop}
//                             >
//                                 Cancel
//                             </Button>
//                         </div>
//                     </Box>
//                 </Backdrop>
//             )}
//         </div>
//     )
// }
function Bookmark() {

    const [ bookmarks, setBookmarks ] = useState([]);

    useEffect(() =>  {
        const fetchBookmarks = async () => {
            try{
                const response = await apiClient.get( '/user/bookmark' );
                setBookmarks( response.data.data );
                console.log( response.data );
            }
            catch( error ){
                console.error( `Error Fetching User Bookmarks` );
            }
        };
        fetchBookmarks();
    }, []);

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

                { bookmarks.map((item, index) => (
                    <Link 
                        to = { `/search/page/${ item.page_id }` }
                        key = { item.page_id }
                        style = {{
                            textDecoration: 'none'
                        }}
                    >
                        <Card 
                            sx = {{
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
                                flexGrow: 1
                            }}
                        >
                            <CardContent>

                                <Typography
                                    variant = 'h4'
                                    color = '#00bcd4'
                                    sx = {{
                                        
                                    }}
                                >
                                { item.page_id }     
                                </Typography>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </Box>
        </div>
    )
}

export default Bookmark;

