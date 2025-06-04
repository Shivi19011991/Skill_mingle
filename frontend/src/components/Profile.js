import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/api/profile');
        setUserProfile(response.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      {userProfile ? (
        <div>
          <p>Username: {userProfile.username}</p>
          <p>Email: {userProfile.email}</p>
          <p>Skills: {userProfile.skills}</p>
          <p>Bio: {userProfile.bio}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
