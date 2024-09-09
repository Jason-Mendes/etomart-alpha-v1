import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    // You can log the error to an error reporting service here
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Oops! Something went wrong.</h1>
            <p className="text-gray-600 mb-4">We're sorry for the inconvenience. Please try refreshing the page or contact support if the problem persists.</p>
            <button 
              onClick={() => this.setState({ hasError: false })}
              className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;