// client/src/components/ForumPostList.jsx
import React, { useState } from 'react';
import CommentList from './commentList';
import CommentForm from './commentForm';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ForumPostList = ({ forumPosts, setForumPosts }) => {
  const auth = useSelector((state) => state.auth);
  const [editPost, setEditPost] = useState(null);
  const [editContent, setEditContent] = useState('');

  const updateComments = (forumPostId, comments) => {
    const updatedPosts = forumPosts.map(post =>
      post._id === forumPostId ? { ...post, comments } : post
    );
    console.log("Forum Post List - Updated Posts:", updatedPosts);
    setForumPosts(updatedPosts);
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`/api/forum/${postId}`, {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      });
      setForumPosts(forumPosts.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEditPost = (post) => {
    setEditPost(post);
    setEditContent(post.content);
  };

  const handleSaveEdit = async (postId) => {
    try {
      const { data: updatedPost } = await axios.put(`/api/forum/${postId}`, { content: editContent }, {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      });
      setForumPosts(forumPosts.map(post => post._id === postId ? updatedPost : post));
      setEditPost(null);
    } catch (error) {
      console.error('Error editing post:', error);
    }
  };

  return (
    <div className="forum-post-list">
      {forumPosts.length === 0 ? (
        <p>No posts to display</p>
      ) : (
        forumPosts.map(post => (
          <div key={post._id} className="forum-post">
            <h2>{post.title}</h2>
            {editPost && editPost._id === post._id ? (
              <>
                <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} />
                <button onClick={() => handleSaveEdit(post._id)}>Save</button>
                <button onClick={() => setEditPost(null)}>Cancel</button>
              </>
            ) : (
              <>
                <p>{post.content}</p>
                {auth.user._id === post.user._id && (
                  <>
                    <button onClick={() => handleEditPost(post)}>Edit</button>
                    <button onClick={() => handleDeletePost(post._id)}>Delete</button>
                  </>
                )}
              </>
            )}
            <small>Posted by {post.user.userName} on {new Date(post.createdAt).toLocaleDateString()}</small>
            <CommentList comments={post.comments} forumPostId={post._id} updateComments={updateComments} />
            <CommentForm forumPostId={post._id} updateComments={updateComments} />
          </div>
        ))
      )}
    </div>
  );
};

export default ForumPostList;