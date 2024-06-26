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

// LoggedInContext 
const LoggedInContext = createContext();

export const LoggedInProvider = ({ children }) => {

    const [ isLoggedIn, setIsLoggedIn ] = useState( false );

    
}