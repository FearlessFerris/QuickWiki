// Page Component Implementation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Box, Card, CardContent, CardMedia, Typography, } from '@mui/material';


// Components & Necessary Files 
import apiClient from '../api/apiClient';


// Page Component 
function Page(){

    const { query } = useParams();
    const [ pageData, setPageData ] = useState( null );
    
    useEffect( () => {
        const fetchPageData = async () => {
            try {
                const response = await apiClient.get( `/search/page/${ query }` );
                console.log( response.data );
            }
            catch ( error ){
                console.error( `Error fetching page data: `, error );
            }
        };

        fetchPageData();
    }, [ query ]);
    
    return(
        <div>
            <h1> I am the page component!!! </h1>
        </div>
    )
}

export default Page;