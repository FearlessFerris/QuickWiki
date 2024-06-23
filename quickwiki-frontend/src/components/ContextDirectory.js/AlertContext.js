// Alert Context Implementation 


// Dependencies 
import React, { createContext, useState, useEffect, useContext } from 'react';


// Components & Necessary Files 


/* Alert Context 

    - Purpose of this ALert Context is to wrap around my current main application in
      order to have access to alerts and alert notifications in all components 
*/

// Create the Alert Context 
const AlertContext = createContext();

export const AlertProvider = ({ children }) => {

    const [ alert, setAlert ] = useState({});

    const displayAlert = ( message, type = 'info' ) => {
        setAlert({ message, type });
    }

    const hideAlert = () => {
        setAlert( null );
    }

    return(
        <AlertContext.Provider value = {{ alert, displayAlert, hideAlert }} >
            { children }
        </AlertContext.Provider>
    )
}

export const useAlert = () => useContext( AlertContext );