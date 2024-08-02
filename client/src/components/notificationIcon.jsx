// client/src/components/NotificationIcon.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import '../assets/style/Notification.css'; // Make sure this path is correct
const NotificationIcon = () => {
  const [notifications, setNotifications] = useState([]);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await axios.get('/api/notifications', {
          headers: { Authorization: `Bearer ${auth.user.token}` },
        });
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [auth.user.token]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="notification-icon">
      <i className="fas fa-bell"></i>
      {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
      <div className="dropdown">
        {notifications.map((notification) => (
          <div key={notification._id} className={`notification ${notification.isRead ? '' : 'unread'}`}>
            {notification.message}
            <small>{new Date(notification.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationIcon;