import axios from 'axios';

// Connect to our local backend
const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Helper to extract the error message from the backend response
export const extractError = (err) => {
  if (err.response && err.response.data && err.response.data.error) {
    return err.response.data.error;
  }
  return err.message || 'An unexpected error occurred';
};

export default apiClient;
