// API Client Implementation 


// Dependencies 
import axios from 'axios';


// Components & Necessary Files


// API Client 
const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:5000/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

export default apiClient;