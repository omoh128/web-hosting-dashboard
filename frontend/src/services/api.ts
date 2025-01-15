// src/services/api.ts
import axios from 'axios';

// Define the base URL for your API
const BASE_URL = 'https://your-api-url.com';

// Create an Axios instance
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add request interceptor (e.g., to include auth token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Add response interceptor to handle common errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error (e.g., redirect to login page)
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
