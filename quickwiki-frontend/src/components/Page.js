// Page Component Implementation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Box, Button, Card, CardContent, CardMedia, Typography, } from '@mui/material';
import { parse } from 'node-html-parser';

// Components & Necessary Files 
import apiClient from '../api/apiClient';


// Page Component 
function Page(){

    const { title } = useParams();
    const [ pageData, setPageData ] = useState( null );
    const [ htmlData, setHtmlData ] = useState( '' ); 
    const [ loading, setLoading ] = useState( false );

    
    useEffect( () => {
        const fetchPageData = async () => {
            try {
                const response = await apiClient.get( `/search/page/${ title }` );
                setPageData( response.data.data );
                setHtmlData( response.data.html );
            }
            catch ( error ){
                console.error( `Error fetching page data: `, error );
            }
        };

        fetchPageData();
    }, [ title ]);

    const transformHtmlLinks = (html) => {
        const root = parse(html);
        root.querySelectorAll('a').forEach((anchor) => {
            let href = anchor.getAttribute('href');
            if (href) {
                if (href.startsWith('/wiki/')) {
                    href = `/search/page/${href.substring(6)}`;
                } else if (href.startsWith('//en.wikipedia.org/wiki/')) {
                    href = href.replace('//en.wikipedia.org/wiki/', '/search/page/');
                }
                anchor.setAttribute('href', href);
            }
        });

        // Remove <base> tag if it exists
        const baseTag = root.querySelector('base');
        if (baseTag) {
            baseTag.setAttribute( 'href', 'localhost:3000/' );
        }

        return root.toString();
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
                <Typography variant='h2'>Loading...</Typography>
            ) : (
                pageData && (
                    <Card 
                        sx={{
                            backgroundColor: '#212121',
                            margin: '4rem',
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
                                {/* <Box sx={{ flex: 1, textAlign: 'center' }}> */}
                                    <Typography
                                        variant='h2'
                                        sx={{
                                            textAlign: 'center',
                                            color: '#00bcd4',
                                        }}
                                    >
                                        {pageData.title}
                                    </Typography>
                                {/* </Box> */}
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
                                >
                                    Add to Bookmarks
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