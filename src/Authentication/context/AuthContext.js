// src/Authentication/context/AuthContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import * as api from '../../services/Apis/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (phoneNumber, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.login(phoneNumber, password);
      setUser(data.user);
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      localStorage.setItem('authToken', data.token);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, surname, phoneNumber, password, email = '', namibianId = '') => {
    setLoading(true);
    setError(null);
    try {
      const userData = { name, surname, phoneNumber, password, email, namibianId };
      const data = await api.signup(userData);
      setUser(data.user);
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      localStorage.setItem('authToken', data.token);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      setUser(null);
      localStorage.removeItem('currentUser');
      localStorage.removeItem('authToken');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email) => {
    setLoading(true);
    setError(null);
    try {
      await api.resetPassword(email);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (updatedUserData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedUser = await api.updateUserProfile(user.id, updatedUserData);
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    resetPassword,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// // AuthContext.js
// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { getStoredUsers, storeUser, updateUser } from '../utils/authUtils';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('currentUser');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//     setLoading(false);
//   }, []);

//   const login = async (phoneNumber, password) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const users = getStoredUsers();
//       const user = users.find(u => u.phoneNumber === phoneNumber && u.password === password);
//       if (user) {
//         setUser(user);
//         localStorage.setItem('currentUser', JSON.stringify(user));
//       } else {
//         throw new Error('Invalid credentials');
//       }
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const signup = async (name, surname, phoneNumber, password, email = '', namibianId = '') => {
//     setLoading(true);
//     setError(null);
//     try {
//       const users = getStoredUsers();
//       if (users.some(u => u.phoneNumber === phoneNumber)) {
//         throw new Error('User already exists');
//       }
//       const newUser = { name, surname, phoneNumber, password, email, namibianId, id: Date.now().toString() };
//       storeUser(newUser);
//       setUser(newUser);
//       localStorage.setItem('currentUser', JSON.stringify(newUser));
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       setUser(null);
//       localStorage.removeItem('currentUser');
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetPassword = async (email) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const users = getStoredUsers();
//       const user = users.find(u => u.email === email);
//       if (user) {
//         // In a real scenario, you would send an email here
//         console.log(`Password reset email sent to ${email}`);
//       } else {
//         throw new Error('User not found');
//       }
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateUserProfile = async (updatedUserData) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const updatedUser = { ...user, ...updatedUserData };
//       updateUser(updatedUser);
//       setUser(updatedUser);
//       localStorage.setItem('currentUser', JSON.stringify(updatedUser));
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const value = {
//     user,
//     loading,
//     error,
//     login,
//     signup,
//     logout,
//     resetPassword,
//     updateUserProfile,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };