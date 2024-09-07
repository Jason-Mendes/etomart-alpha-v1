import { Edit, Trash2, User } from 'lucide-react';
import React, { useState } from 'react';
import UnavailableFeatureOverlay from '../../../UnavailableFeatureOverlay';

const PersonalProfile = ({ user, setUser }) => {
  const [favorites, setFavorites] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser(prevUser => ({
          ...prevUser,
          profileImage: reader.result,
          useInitials: false
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setUser(prevUser => ({
      ...prevUser,
      profileImage: null,
      useInitials: true
    }));
  };

  const handleAddFavorite = () => {
    // This would typically open a modal or navigate to a page to add a favorite
    console.log('Add favorite');
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const toggleInitials = () => {
    setUser(prevUser => ({
      ...prevUser,
      useInitials: !prevUser.useInitials
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-4">
            <div className="w-24 h-24 bg-orange-200 rounded-full flex items-center justify-center overflow-hidden">
              {user.useInitials ? (
                <span className="text-4xl font-bold text-orange-600">{getInitials(user.name)}</span>
              ) : user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={64} className="text-orange-600" />
              )}
            </div>
          </div>
          <div className="flex space-x-2 mb-4">
            <label htmlFor="file-upload" className="cursor-pointer bg-orange-600 text-white px-3 py-2 rounded-md text-sm font-medium shadow-sm hover:bg-orange-700 transition-colors duration-200 flex items-center">
              <Edit size={16} className="mr-2" />
              Edit Picture
            </label>
            <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
            <button
              onClick={handleDeleteImage}
              className="bg-white text-red-600 px-3 py-2 rounded-md text-sm font-medium shadow-sm hover:bg-red-50 transition-colors duration-200 flex items-center border border-red-600"
              disabled={!user.profileImage && user.useInitials}
            >
              <Trash2 size={16} className="mr-2" />
              Delete Picture
            </button>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">{user.name}</h2>
            <button
              onClick={toggleInitials}
              className="bg-white text-orange-600 px-4 py-2 rounded-full text-sm font-medium border border-orange-600 hover:bg-orange-50 transition-colors duration-200"
            >
              {user.useInitials ? 'Use Profile Picture' : 'Use Initials'}
            </button>
          </div>
        </div>
        <div className="space-y-4 mt-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Email</h3>
            <p className="mt-1">{user.email}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Phone number</h3>
            <p className="mt-1">{user.phoneNumber}</p>
          </div>
        </div>
      </div>

      {/* Your Favorites Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Your favorites</h2>
          <button
            onClick={handleAddFavorite}
            className="flex items-center bg-white text-orange-600 px-3 py-1 rounded-full text-sm font-medium border border-orange-600 hover:bg-orange-50"
          >
            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            Favourite
          </button>
        </div>
        <p className="text-gray-600 mb-4">
          You'll find your favorite restaurants and stores here. You can add favorites by tapping the heart icon.
        </p>
        {favorites.length === 0 ? (
          <p className="text-gray-500 italic">No favorites added yet.</p>
        ) : (
          <ul className="space-y-2">
            {favorites.map((favorite, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{favorite.name}</span>
                <button className="text-red-500 hover:text-red-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="space-y-6">
      <UnavailableFeatureOverlay>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Etomart tokens</h3>
          <p className="text-sm text-gray-600 mb-4">Each token will get you a standard delivery with no delivery fee.</p>
          <div className="flex justify-between items-center">
            <button className="text-orange-600 font-medium">View tokens</button>
            <div className="flex items-center">
              <span className="mr-2 font-semibold">0 ×</span>
              <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 15a5 5 0 100-10 5 5 0 000 10z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-2">Etomart credits</h3>
            <p className="text-sm text-gray-600 mb-4">You can use credits to pay for your orders.</p>
            <div className="flex justify-between items-center">
              <button className="text-orange-600 font-medium">View credits</button>
              <span className="font-semibold">N$ 0.00</span>
            </div>
          </div>
         
          </UnavailableFeatureOverlay>
      </div>
      
    </div>
  );
};

export default PersonalProfile;