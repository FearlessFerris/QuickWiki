// Private Route Component Implementation 


// Dependencies 
import React from 'react';
import { Navigate } from 'react-router-dom';


// Components & Necessary Files 
import { useLoggedIn } from './ContextDirectory.js/LoggedInContext';



// Private Route Component 
function PrivateRoute({ component: Component }) {

    const { isLoggedIn } = useLoggedIn();
    return isLoggedIn ? <Component /> : <Navigate to = '/user/login' /> ;
}

export default PrivateRoute;