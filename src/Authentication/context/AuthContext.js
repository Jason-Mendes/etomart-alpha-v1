import React, { createContext, useState, useContext, useEffect } from 'react';

// TODO: Replace with actual Firebase import when integrating
const mockFirebase = {
  auth: () => ({
    onAuthStateChanged: (callback) => {
      // Simulate auth state change
      callback(null);
      return () => {};
    },
  }),
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO: Replace with actual Firebase auth when integrating
    const unsubscribe = mockFirebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (phoneNumber, password, email = '') => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Implement actual Firebase login
      const userData = { phoneNumber, email, id: 'mock-user-id' }; // Mock user data
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
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
      // TODO: Implement actual Firebase signup
      const userData = { name, surname, phoneNumber, email, namibianId, id: 'mock-user-id' }; // Mock user data
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
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
      // TODO: Implement actual Firebase logout
      setUser(null);
      localStorage.removeItem('user');
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
      // TODO: Implement actual Firebase password reset
      console.log(`Password reset email sent to ${email}`);
      // Simulate a successful password reset email sent
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Add resetPassword to the value object
  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    resetPassword, // Add this line
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