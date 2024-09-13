// Alert Component Implementation 


// Dependencies 
import React, { useState, useContext, useEffect, createContext } from 'react';
import { Alert, Snackbar, Typography } from '@mui/material';


// Components & Necessary Files 
import { useAlert } from './ContextDirectory.js/AlertContext';


// Alert Component 
function AlertComponent() {

    const { alert, hideAlert } = useAlert();

    if( !alert ){
        return null 
    }
    
    return(
        <Snackbar 
            open = { !!alert }
            autoHideDuration = { 6000 }
            onClose = { hideAlert }
            anchorOrigin = {{ vertical: 'top', horizontal: 'center' }}
            style = {{
                marginTop: '5rem'
            }}
        >
            { alert && (
                <Alert 
                    onClose={hideAlert}
                    severity={alert.type}
                    sx={{
                        alignItems: 'center',
                        color: '#212121',
                        backgroundColor: '#00bcd4',
                        fontSize: '1.3rem',
                        textAlign: 'center',
                        width: 'auto',
                        '& .MuiAlert-message': {
                            width: '100%',
                            textAlign: 'center',
                        }
                    }}
                >
                { alert.message }
                </Alert>
            )}
        </Snackbar>
    )
}

export default AlertComponent;