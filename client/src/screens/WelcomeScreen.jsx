// client/src/screens/WelcomeScreen.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WelcomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get('/api/posts');
      setPosts(data);
    };

    const fetchUserName = () => {
      const queryParams = new URLSearchParams(window.location.search);
      setName(queryParams.get('name') || '');
    };

    fetchPosts();
    fetchUserName();
  }, []);

  const submitFeedback = async () => {
    try {
      await axios.post('/api/feedback', { feedback });
      setFeedback('');
      alert('Feedback submitted successfully');
    } catch (error) {
      alert('Error submitting feedback');
    }
  };

  return (
    <div>
      <h1>Hello, {name}!</h1>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>{post.content}</li>
        ))}
      </ul>
      <h2>Feedback</h2>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Write your feedback here..."
      />
      <button onClick={submitFeedback}>Submit Feedback</button>
    </div>
  );
};

export default WelcomeScreen;
