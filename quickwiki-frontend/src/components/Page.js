// Page Component Implementation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Alert, Box, Button, Card, CardContent, CardMedia, CircularProgress, LinearProgress, Typography, } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
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

    const addBookmark = async () => {
        try{
            const response = await apiClient.post( `/user/bookmark/add/${ title }` );
            displayAlert( `${ title }, was added to your bookmark list!`, 'success' );
            console.log( response.data );
        }
        catch( error ){
            console.error( `Error adding bookmark!`, error );
            displayAlert( 'Must be logged in to Bookmark Pages', 'error' );
        }
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
                                    onClick = { addBookmark }
                                >
                                <BookmarkIcon
                                    fontSize = 'large'
                                    sx = {{
                                        marginBottom: '.4rem'
                                    }}
                                ></BookmarkIcon> Bookmark
                                </Button>
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
        </div>
    );
}


export default Page;