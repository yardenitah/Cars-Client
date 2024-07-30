// src/screens/ProfileScreen.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProfileScreen = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/api/users/${userId}`);
      setUser(data);
    };

    fetchUser();
  }, [userId]);

  return (
    <div>
      {user ? (
        <>
          <h1>{user.userName}</h1>
          <p>Email: {user.email}</p>
          <img src={user.img} alt="Profile" />
          {/* Add more user details as needed */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfileScreen;
