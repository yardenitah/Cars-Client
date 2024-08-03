import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import apiBaseUrl from '../constants';
const PostList = ({ posts, user, likePost, deletePost, editPost }) => {
  const [editingPostId, setEditingPostId] = useState(null);
  const [editingPostContent, setEditingPostContent] = useState("");
  const [editingPostImage, setEditingPostImage] = useState(null);

  const handleEditClick = (post) => {
    setEditingPostId(post._id);
    setEditingPostContent(post.content);
    setEditingPostImage(null); // Reset image on edit click
  };

  const handleEditChange = (e) => {
    setEditingPostContent(e.target.value);
  };

  const handleImageChange = (e) => {
    setEditingPostImage(e.target.files[0]);
  };

  const handleEditSubmit = (post) => {
    const updatedPost = new FormData();
    updatedPost.append('content', editingPostContent);
    if (editingPostImage) {
      updatedPost.append('image', editingPostImage);
    }
    editPost(post._id, updatedPost);
    setEditingPostId(null);
  };

  return (
    <ul>
      {posts.map((post) => (
        <li key={post._id}>
          <Link to={`/profile/${post.user?._id}`}>
            <strong>{post.user?.userName}</strong>
          </Link>
          {editingPostId === post._id ? (
            <>
              <textarea
                value={editingPostContent}
                onChange={handleEditChange}
              />
              <input type="file" onChange={handleImageChange} />
              <button onClick={() => handleEditSubmit(post)}>Save</button>
              <button onClick={() => setEditingPostId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <p>{post.content}</p>
              {post.image && <img src={`${apiBaseUrl}/api/uploads/${post.image}`} alt="Post" />}
              <p>Likes: {post.likes.length}</p>
              <button onClick={() => likePost(post._id)}>
                {post.likes.includes(user._id) ? 'Unlike' : 'Like'}
              </button>
              {user && post.user && user._id === post.user._id && (
                <>
                  <button onClick={() => handleEditClick(post)}>Edit</button>
                  <button onClick={() => deletePost(post._id)}>Delete</button>
                </>
              )}
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default PostList;