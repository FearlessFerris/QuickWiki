// LoggedIn Context Implementation 


// Depedecies 
import React, { createContext, useState, useEffect, useContext } from 'react';
import apiClient from '../../api/apiClient';


// Components & Necessary Files 

/* 
    LoggedInContext 

      - Purpose of this context is to wrap the entire application within this 
        in order to ensure user logged in status is kept throughout the entire 
        application 
    
*/

// Create LoggedInContext 
const LoggedInContext = createContext();


// Custom hook to use the LoggedInContext 
export const useLoggedIn = () => useContext( LoggedInContext );


// LoggedInContext Component 
export const LoggedInProvider = ({ children }) => {

    const [ isLoggedIn, setIsLoggedIn ] = useState( false );
    const [ userId, setUserId ] = useState( null );
    const [ userImage, setUserImage ] = useState( null );


    useEffect( () => {
        const token = localStorage.getItem( 'access_token' );
        const storedUserId = localStorage.getItem( 'user_id' );
        const storedUserImage = localStorage.getItem( 'user_image' );

        if( token && storedUserId ){
            console.log( 'We found the token!!!' );
            setIsLoggedIn( true );
            setUserId( storedUserId );
            if( storedUserImage ){
                setUserImage( storedUserImage );
            }
        }
    }, [] );

    const fetchUserProfile = async ( id ) => {
        try{
            const response = await apiClient.get( '/profile' );
            const userProfile = response.data.user;
            setUserImage( userProfile.image_url || userProfile.uploaded_image );
            console.log( userImage );
        }
        catch( error ){
            console.error( 'Error fetching user profile' );
        }
    }

    const login = ( id ) => {
        console.log( 'Logging in!' );
        setIsLoggedIn( true );
        setUserId( id );
        localStorage.setItem( 'user_id', id );
        localStorage.getItem( 'user_id', id );
        fetchUserProfile();
    }

    const logout = () => {
        console.log( 'Logging out!' );
        localStorage.removeItem( 'access_token' );
        localStorage.removeItem( 'user_id' );
        setIsLoggedIn( false );
        setUserId( null );
        setUserImage( null );
    }

    return(
        <LoggedInContext.Provider value = {{ isLoggedIn, userId, userImage, login, logout }}>
            { children }
        </LoggedInContext.Provider>
    )
}