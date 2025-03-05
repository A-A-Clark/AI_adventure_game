import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FaUserCircle } from 'react-icons/fa';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-blue-900 p-6">
      <div className="flex items-center">
        <FaUserCircle className="text-gray-800 dark:text-gray-100 text-8xl mr-4" />
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
          {user && user.username ? `${user.username}'s Profile` : "Your Profile"}
        </h1>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mt-2">This is your profile page.</p>
      {/* Add additional profile details here */}
    </div>
  );
};

export default Profile;
