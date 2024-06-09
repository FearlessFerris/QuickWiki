// Auth API Client Implementation 


// Dependencies 
import apiClient from "./apiClient";


// Components & Necessary Files 


// Auth API Client 
export const login = async ( username, password ) => {
    try{
        const response = await apiClient.post( '/login', { username, password } );
        console.log( response.data );
        return response.data;
    }
    catch( error ){
        throw error.response.data;
    }
}


