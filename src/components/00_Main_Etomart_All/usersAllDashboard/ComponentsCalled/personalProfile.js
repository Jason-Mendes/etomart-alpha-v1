import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { Edit, Trash2, User, Save } from 'lucide-react';
import { useAuth } from '../../../../Authentication/context/AuthContext';
import { profileUpdateSchema } from '../../../../Authentication/validation/authValidationSchemas';
import { formatUserData, maskSensitiveInfo } from '../../../../Authentication/utils/userProfileUtils';
import UnavailableFeatureOverlay from '../../../common/UnavailableFeatureOverlay';

const PersonalProfile = () => {
  const { user, updateUserProfile, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [favorites, setFavorites] = useState([]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUserProfile({ profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    updateUserProfile({ profileImage: null, useInitials: true });
  };

  const handleAddFavorite = () => {
    console.log('Add favorite');
  };

  const getInitials = (name, surname) => {
    return `${name[0]}${surname[0]}`.toUpperCase();
  };

  const toggleInitials = () => {
    updateUserProfile({ useInitials: !user.useInitials });
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-4">
            <div className="w-24 h-24 bg-orange-200 rounded-full flex items-center justify-center overflow-hidden">
              {user.useInitials ? (
                <span className="text-4xl font-bold text-orange-600">{getInitials(user.name, user.surname)}</span>
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
            <h2 className="text-2xl font-semibold mb-2">{`${user.name} ${user.surname}`}</h2>
            <button
              onClick={toggleInitials}
              className="bg-white text-orange-600 px-4 py-2 rounded-full text-sm font-medium border border-orange-600 hover:bg-orange-50 transition-colors duration-200"
            >
              {user.useInitials ? 'Use Profile Picture' : 'Use Initials'}
            </button>
          </div>
        </div>
        
        <Formik
          initialValues={formatUserData(user)}
          validationSchema={profileUpdateSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await updateUserProfile(values);
              setIsEditing(false);
            } catch (error) {
              console.error('Error updating profile:', error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm ${errors.name && touched.name ? 'border-red-500' : ''}`}
                  disabled={!isEditing}
                />
                {errors.name && touched.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
              </div>

              <div>
                <label htmlFor="surname" className="block text-sm font-medium text-gray-700">Surname</label>
                <Field
                  type="text"
                  name="surname"
                  id="surname"
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm ${errors.surname && touched.surname ? 'border-red-500' : ''}`}
                  disabled={!isEditing}
                />
                {errors.surname && touched.surname && <div className="text-red-500 text-sm mt-1">{errors.surname}</div>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm ${errors.email && touched.email ? 'border-red-500' : ''}`}
                  disabled={!isEditing}
                />
                {errors.email && touched.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <Field
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm ${errors.phoneNumber && touched.phoneNumber ? 'border-red-500' : ''}`}
                  disabled={!isEditing}
                />
                {errors.phoneNumber && touched.phoneNumber && <div className="text-red-500 text-sm mt-1">{errors.phoneNumber}</div>}
              </div>

              {isEditing ? (
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-white text-gray-700 px-4 py-2 rounded-md text-sm font-medium shadow-sm hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm hover:bg-orange-700 transition-colors duration-200 flex items-center"
                  >
                    <Save size={16} className="mr-2" />
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm hover:bg-orange-700 transition-colors duration-200 flex items-center"
                >
                  <Edit size={16} className="mr-2" />
                  Edit Profile
                </button>
              )}
            </Form>
          )}
        </Formik>
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