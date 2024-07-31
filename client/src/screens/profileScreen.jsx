import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../slices/authSlice';
import UploadForm from '../components/uploadForm';
import '../assets/style/profileScreen.css';

const ProfileScreen = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [img, setImg] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const dispatch = useDispatch();
  const { user: loggedInUser } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`/api/users/${userId}`, { withCredentials: true });
        setUser(data);
        setUserName(data.userName);
        setEmail(data.email);
        setImg(data.img);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleEditClick = () => setIsEditing(true);

  const handleCancelClick = () => {
    setIsEditing(false);
    if (user) {
      setUserName(user.userName);
      setEmail(user.email);
      setImg(user.img);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/users/profile', { userName, email, img }, {
        withCredentials: true,
      });
      setUser(response.data);
      alert('Success');
      dispatch(setUser(response.data));
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.response && error.response.status === 401) {
        alert('Unauthorized. Please log in again.');
      }
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert('New passwords do not match');
      return;
    }
    try {
      await axios.put('/api/users/change-password', { oldPassword, newPassword }, {
        withCredentials: true,
      });
      alert('Password updated successfully');
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error) {
      console.error('Error updating password:', error);
      if (error.response && error.response.status === 401) {
        alert('Unauthorized. Please log in again.');
      } else {
        alert('Error updating password');
      }
    }
  };

  const handleDeleteUser = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action is irreversible.')) {
      return;
    }
    try {
      await axios.delete('/api/users/profile', {
        withCredentials: true,
      });
      alert('Account deleted successfully');
      dispatch(clearUser());
      navigate("/");
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const handleImageError = (e) => {
    e.target.src = '/defaultprofile.png';
  };

  return (
    <div className="profile-container">
      {user ? (
        <>
          <h1>{user.userName}</h1>
          <p>Email: {user.email}</p>
          <img 
            src={`/api/uploads/${user.img}`} 
            alt="Profile" 
            className="profile-pic"
            onError={handleImageError}
          />
          <p>Following: {user.following.length}</p>

          {loggedInUser && loggedInUser._id === user._id && (
            <>
              {isEditing ? (
                <>
                  <div className="form-group">
                    <label>User Name:</label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Profile Image URL:</label>
                    <input
                      type="text"
                      value={img}
                      onChange={(e) => setImg(e.target.value)}
                    />
                  </div>
                  <UploadForm setImg={setImg} />
                  <button onClick={handleSubmit}>Save</button>
                  <button type="button" onClick={handleCancelClick}>Cancel</button>

                  <div className="form-group">
                    <label>Old Password:</label>
                    <input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>New Password:</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm New Password:</label>
                    <input
                      type="password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                  </div>
                  <button onClick={handlePasswordChange}>Change Password</button>
                  <button type="button" onClick={handleDeleteUser}>Delete Account</button>
                </>
              ) : (
                <button onClick={handleEditClick}>Edit Profile</button>
              )}
            </>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfileScreen;