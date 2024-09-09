// userProfileUtils.js
export const formatUserData = (userData) => {
  return {
    id: userData.id || '',
    name: userData.name || '',
    surname: userData.surname || '',
    phoneNumber: userData.phoneNumber || '',
    email: userData.email || '',
    namibianId: userData.namibianId || '',
    profileImage: userData.profileImage || null,
    useInitials: userData.useInitials || false,
  };
};

// Utility function to validate email
export const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

// Utility function to validate phone number
export const validatePhoneNumber = (phoneNumber) => {
  const re = /^\+?[1-9]\d{1,14}$/;
  return re.test(phoneNumber);
};

// Utility function to format phone number
export const formatPhoneNumber = (phoneNumber) => {
  // This is a simple implementation. You might want to use a library like libphonenumber-js for more robust formatting
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return phoneNumber;
};

// Utility function to validate Namibian ID
export const validateNamibianId = (namibianId) => {
  const re = /^[0-9]{11}$/;
  return re.test(namibianId);
};

// Utility function to mask sensitive information
export const maskSensitiveInfo = (info, showLast = 4) => {
  if (!info) return '';
  const length = info.length;
  return '*'.repeat(length - showLast) + info.slice(-showLast);
};

export const validateProfileData = (profileData) => {
  const errors = {};
  if (!profileData.name) errors.name = 'Name is required';
  if (!profileData.email) errors.email = 'Email is required';
  if (!profileData.phoneNumber) errors.phoneNumber = 'Phone number is required';
  return errors;
};