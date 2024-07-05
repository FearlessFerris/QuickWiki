// Home Component Implementation 

// Dependencies 
import React, { useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

// Components & Necessary Files 
import SearchBar from './SearchBar';
import '../static/Home.css';

// Home Component 
function Home() {
    const [alerts, setAlerts] = useState({});
    const [results, setResults] = useState([]);

    return( 
        <div className='home-container'> 
            <div className='centered'>
                <SearchBar results={results} setResults={setResults} />
                <div className='results-container'>
                    {results.map((item, index) => (
                        <Card 
                            key={index} 
                            sx={{ 
                                border: '.1rem solid #00bcd4',
                                backgroundColor: '#212121',
                                display: 'flex',
                                flexDirection: 'row', 
                                alignItems: 'center', 
                                justifyContent: 'space-between',
                                margin: '1rem', 
                                padding: '1rem', 
                                boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)',
                                width: '50rem',
                                height: '8rem',
                                flexGrow: 1,
                            }}
                        >
                            <CardContent 
                                sx={{ 
                                    flexGrow: 1,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical'
                                }}
                            >
                                <Typography variant='h4' color='#00bcd4' noWrap>
                                    {item.title}
                                </Typography>
                                <Typography variant='h6' color='#6a1b9a' noWrap>
                                    {item.description}
                                </Typography>
                            </CardContent>
                            {item.thumbnail && (
                                <CardMedia
                                    component="img"
                                    sx={{ 
                                        width: 125, 
                                        height: 125, 
                                        marginLeft: '1rem',
                                        objectFit: 'cover'
                                    }}
                                    image={item.thumbnail.url}
                                    alt=""
                                />
                            )}
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home;
