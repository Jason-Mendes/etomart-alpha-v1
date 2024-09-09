// src/services/api.js

import axios from 'axios';
import { handleApiError } from '../../components/common/utils/errorHandling';

const API_BASE_URL = 'https://api.etomart.com/v1'; // Replace with your actual API base URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = handleApiError(error);
    return Promise.reject(customError);
  }
);

export const login = async (phoneNumber, password) => {
  try {
    const response = await api.post('/auth/login', { phoneNumber, password });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const signup = async (userData) => {
  try {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const resetPassword = async (email) => {
  try {
    const response = await api.post('/auth/reset-password', { email });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateUserProfile = async (userId, userData) => {
  try {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const fetchUserProfile = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Add more API functions as needed

export default api;

// import { handleApiError } from './errorHandling';

// // Simulated delay to mimic network request
// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// // Mock user data
// const mockUsers = [
//   { id: 1, name: 'John Doe', email: 'john@example.com', phoneNumber: '+1234567890' },
//   { id: 2, name: 'Jane Smith', email: 'jane@example.com', phoneNumber: '+0987654321' },
// ];

// // Mock API functions
// export const api = {
//   login: async (email, password) => {
//     await delay(1000); // Simulate network delay
//     const user = mockUsers.find(u => u.email === email);
//     if (user && password === 'password') { // Simple password check
//       return { ...user, token: 'mock-jwt-token' };
//     }
//     throw new Error('Invalid credentials');
//   },

//   register: async (userData) => {
//     await delay(1000);
//     const newUser = { ...userData, id: mockUsers.length + 1 };
//     mockUsers.push(newUser);
//     return { ...newUser, token: 'mock-jwt-token' };
//   },

//   getUserProfile: async (userId) => {
//     await delay(500);
//     const user = mockUsers.find(u => u.id === userId);
//     if (user) {
//       return user;
//     }
//     throw new Error('User not found');
//   },

//   updateUserProfile: async (userId, userData) => {
//     await delay(1000);
//     const index = mockUsers.findIndex(u => u.id === userId);
//     if (index !== -1) {
//       mockUsers[index] = { ...mockUsers[index], ...userData };
//       return mockUsers[index];
//     }
//     throw new Error('User not found');
//   },

//   // Add more mock API functions as needed
// };

// // Wrapper function to handle API errors
// export const callApi = async (apiFunction, ...args) => {
//   try {
//     return await apiFunction(...args);
//   } catch (error) {
//     const errorMessage = handleApiError(error);
//     throw new Error(errorMessage);
//   }
// };