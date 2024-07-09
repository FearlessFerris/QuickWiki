// Home Component Implementation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';


// Components & Necessary Files 
import SearchBar from './SearchBar';
import '../static/Home.css';


// Home Component 
function Home() {

    const [alerts, setAlerts] = useState({});
    const [results, setResults] = useState([]);
    const [displayedResults, setDisplayedResults] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const loadInitialResults = () => {
            const initialResults = results.slice(0, itemsPerPage);
            setDisplayedResults(initialResults);
        };

        loadInitialResults();
    }, [results]);

    useEffect(() => {
        const handleScroll = () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                loadMoreResults();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [displayedResults, results]);

    const loadMoreResults = () => {
        const nextPage = page + 1;
        const startIndex = nextPage * itemsPerPage - itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const moreResults = results.slice(startIndex, endIndex); 
        setDisplayedResults(prevResults => [...prevResults, ...moreResults]);
        setPage(nextPage);
    };

    return( 
        <div className='home-container'> 
            <div className='centered'>
                <SearchBar results={results} setResults={setResults} />
                <div className='results-container'>
                    {displayedResults.map((item, index) => (
                    <Link 
                        to = { `/search/page/${ item.title }` } 
                        key = { item.index }
                        style = {{
                            textDecoration: 'none'
                        }}
                    >
                        <Card
                            key={index} 
                            sx={{ 
                                border: '.1rem solid #00bcd4',
                                borderRadius: '1rem',
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
                                <Typography 
                                    variant='h4' 
                                    color='#00bcd4' 
                                    noWrap
                                >
                                    {item.title}
                                </Typography>
                                <Typography 
                                    variant='h6' 
                                    color='#6a1b9a' 
                                    noWrap
                                >
                                    {item.description}
                                </Typography>
                            </CardContent>
                            {item.thumbnail && (
                                <CardMedia
                                component="img"
                                sx={{ 
                                    borderRadius: '1rem',
                                    width: 'auto',
                                    maxWidth: '150px', 
                                    height: 'auto', 
                                    maxHeight: '150px',
                                    marginLeft: '1rem',
                                    objectFit: 'cover'
                                }}
                                image={item.thumbnail.url}
                                alt=""
                                />
                            )}
                        </Card>
                    </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;

 