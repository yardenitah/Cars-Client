import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EventList = ({ events, user, editEvent, deleteEvent }) => {
  const [editingEventId, setEditingEventId] = useState(null);
  const [editingEventDetails, setEditingEventDetails] = useState({
    title: '',
    description: '',
    date: '',
  });
  const [editingEventImage, setEditingEventImage] = useState(null);

  const handleEditClick = (event) => {
    setEditingEventId(event._id);
    setEditingEventDetails({
      title: event.title,
      description: event.description,
      date: event.date,
    });
    setEditingEventImage(null);
  };

  const handleEditChange = (e) => {
    setEditingEventDetails({
      ...editingEventDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setEditingEventImage(e.target.files[0]);
  };

  const handleEditSubmit = (event) => {
    const updatedEvent = new FormData();
    updatedEvent.append('title', editingEventDetails.title);
    updatedEvent.append('description', editingEventDetails.description);
    updatedEvent.append('date', editingEventDetails.date);
    if (editingEventImage) {
      updatedEvent.append('image', editingEventImage);
    }
    editEvent(event._id, updatedEvent);
    setEditingEventId(null);
  };

  return (
    <ul>
      {events.map((event) => (
        <li key={event._id}>
          <Link to={`/profile/${event.user?._id}`}>
            <strong>{event.user?.userName}</strong>
          </Link>
          {editingEventId === event._id ? (
            <>
              <input
                type="text"
                name="title"
                value={editingEventDetails.title}
                onChange={handleEditChange}
              />
              <textarea
                name="description"
                value={editingEventDetails.description}
                onChange={handleEditChange}
              />
              <input
                type="date"
                name="date"
                value={editingEventDetails.date}
                onChange={handleEditChange}
              />
              <input type="file" onChange={handleImageChange} />
              <button onClick={() => handleEditSubmit(event)}>Save</button>
              <button onClick={() => setEditingEventId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>{new Date(event.date).toLocaleDateString()}</p>
              {event.image && <img src={`/api/uploads/${event.image}`} alt="Event" />}
              {user && event.user && user._id === event.user._id && (
                <>
                  <button onClick={() => handleEditClick(event)}>Edit</button>
                  <button onClick={() => deleteEvent(event._id)}>Delete</button>
                </>
              )}
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default EventList;