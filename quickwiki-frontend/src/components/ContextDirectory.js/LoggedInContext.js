// LoggedIn Context Implementation 


// Depedecies 
import React, { createContext, useState, useEffect, useContext } from 'react';


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

    useEffect( () => {
        const token = localStorage.getItem( 'access_token' );
        const storedUserId = localStorage.getItem( 'user_id' );

        if( token && storedUserId ){
            console.log( 'We found the token!!!' );
            setIsLoggedIn( true );
            setUserId( storedUserId );
        }
    }, []);

    const login = ( id ) => {
        console.log( 'Logging in!' );
        setIsLoggedIn( true );
        setUserId( id );
        localStorage.setItem( 'user_id', id );
        localStorage.getItem( 'user_id', id );
    }

    const logout = () => {
        console.log( 'Logging out!' );
        localStorage.removeItem( 'access_token' );
        localStorage.removeItem( 'user_id' );
        setIsLoggedIn( false );
        setUserId( null );
    }

    return(
        <LoggedInContext.Provider value = {{ isLoggedIn, userId, login, logout }}>
            { children }
        </LoggedInContext.Provider>
    )
}