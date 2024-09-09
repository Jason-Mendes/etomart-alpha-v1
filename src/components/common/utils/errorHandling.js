export const handleApiError = (error) => {
    console.error('API Error:', error);
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
      
      switch (error.response.status) {
        case 400:
          return 'Bad request. Please check your input.';
        case 401:
          return 'Unauthorized. Please log in again.';
        case 403:
          return 'Forbidden. You do not have permission to perform this action.';
        case 404:
          return 'Resource not found.';
        case 500:
          return 'Internal server error. Please try again later.';
        default:
          return 'An unexpected error occurred. Please try again.';
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error request:', error.request);
      return 'No response received from the server. Please check your internet connection.';
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
      return 'An unexpected error occurred. Please try again.';
    }
  };
  
  export const logError = (error, additionalInfo = {}) => {
    console.error('Error:', error);
    console.error('Additional Info:', additionalInfo);
    // Here you could send the error to a logging service
  };