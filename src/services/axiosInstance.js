import axios from 'axios';

// Create a custom Axios instance with a base URL and default headers.
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // e.g., "http://localhost:5000/api"
  headers: {
    'Content-Type': 'application/json'
  }
});

// Response interceptor: check if the error indicates an expired token.
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Check if the response status is 401 or 403.
      if (error.response.status === 401 || error.response.status === 403) {
        // Optionally, check the error message to confirm it's due to an expired token.
        const errMsg = error.response.data.message;
        if (errMsg && errMsg.toLowerCase().includes('expired')) {
          // Clear the token from local storage.
          localStorage.removeItem('token');
          // Optionally, display a message or notification to the user.
          // Then redirect the user to the login page.
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
