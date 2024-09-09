// Get stored users from localStorage
export const getStoredUsers = () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  };
  
  // Store a new user
  export const storeUser = (user) => {
    const users = getStoredUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  };
  
  // Remove a user
  export const removeUser = (userId) => {
    const users = getStoredUsers();
    const updatedUsers = users.filter(user => user.id !== userId);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };
  
  // Update a user
  export const updateUser = (updatedUser) => {
    const users = getStoredUsers();
    const index = users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      users[index] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
    }
  };
  
  // Securely store sensitive information (for demonstration purposes)
  export const secureStore = (key, value) => {
    // In a real-world scenario, you'd use more secure methods
    localStorage.setItem(key, btoa(JSON.stringify(value)));
  };
  
  // Retrieve securely stored information
  export const secureRetrieve = (key) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(atob(value)) : null;
  };