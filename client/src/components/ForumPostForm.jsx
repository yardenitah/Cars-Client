// client/src/components/ForumPostForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ForumPostForm = ({ fetchForumPosts }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/forum', { title, content });
      setTitle('');
      setContent('');
      fetchForumPosts();
    } catch (error) {
      console.error('Error creating forum post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default ForumPostForm;