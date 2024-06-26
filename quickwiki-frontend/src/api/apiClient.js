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

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

export default apiClient;