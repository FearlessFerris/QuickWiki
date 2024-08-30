// Auth API Client Implementation 


// Dependencies 
import apiClient from "./apiClient";


// Components & Necessary Files 


// Auth API Client 
export const login = async ( username, password ) => {
    try{
        const response = await apiClient.post( '/login', { username, password } );
        console.log( response.data );
        const profileResponse = await apiClient.get( '/profile' );
        console.log( profileResponse.data );
        return { ...response.data, userProfile: profileResponse.data.user }
    }
    catch( error ){
        throw error.response.data;
    }
}


