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

    useEffect( () => {
        const token = localStorage.getItem( 'access_token' );
        if( token ){
            console.log( 'We found the token!!!' );
            setIsLoggedIn( true );
        }
    }, []);

    const login = () => {
        console.log( 'Logging in!' );
        setIsLoggedIn( true );
    }

    const logout = () => {
        console.log( 'Logging out!' );
        localStorage.removeItem( 'access_token' );
        localStorage.removeItem( 'user_id' );
        setIsLoggedIn( false );
    }

    return(
        <LoggedInContext.Provider value = {{ isLoggedIn, login, logout }}>
            { children }
        </LoggedInContext.Provider>
    )
}