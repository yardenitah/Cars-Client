// client/src/components/CommentForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const CommentForm = ({ forumPostId, updateComments }) => {
  const [content, setContent] = useState('');
  const auth = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: newComment } = await axios.post(`/api/forum/${forumPostId}/comments`, { content, forumPostId }, {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      });
      setContent('');
      // Fetch the updated list of comments
      const { data: comments } = await axios.get(`/api/forum/${forumPostId}/comments`);
      updateComments(forumPostId, comments);
    } catch (error) {
      console.error('Error creating comment:', error); // Log the error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a comment"
        required
      />
      <button type="submit">Post Comment</button>
    </form>
  );
};

export default CommentForm;