import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UploadForm from '../components/uploadForm';
import { useAuth } from '../context/AuthContext'; // Import the AuthContext
import '../assets/style/welcomeScreen.css';

const WelcomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [newPost, setNewPost] = useState({ content: '', img: null });
  const [showPostForm, setShowPostForm] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const { user } = useAuth(); // Get the current user from the AuthContext

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get('/api/posts');
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
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

  const handlePostChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (filePath) => {
    setNewPost({ ...newPost, img: filePath });
  };

  const submitPost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('content', newPost.content);
    formData.append('image', newPost.img);

    try {
      const { data } = await axios.post('/api/posts/post', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setPosts([...posts, data]);
      setNewPost({ content: '', img: null });
      setShowPostForm(false);
      alert('Post submitted successfully');
    } catch (error) {
      alert('Error submitting post');
    }
  };

  const likePost = async (id) => {
    try {
      const { data } = await axios.put(`/api/posts/${id}/like`);
      setPosts(posts.map((post) => (post._id === id ? data : post)));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`/api/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
      alert('Post deleted successfully');
    } catch (error) {
      alert('Error deleting post');
    }
  };

  return (
    <div className="welcome-screen">
      <div className="content">
        <h1>
          Posts
          <button onClick={() => setShowPostForm(!showPostForm)} className="add-btn">
            +
          </button>
        </h1>
        {showPostForm && (
          <div className="post-form">
            <input
              type="text"
              name="content"
              value={newPost.content}
              onChange={handlePostChange}
              placeholder="New post content"
            />
            <UploadForm setImg={handleFileUpload} />
            <button onClick={submitPost}>Add Post</button>
          </div>
        )}
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              <p>{post.content}</p>
              {post.image && <img src={`/api/uploads/${post.image}`} alt="Post" />}
              <p>Likes: {post.likes.length}</p>
              <button onClick={() => likePost(post._id)}>Like</button>
              {user && post.user._id === user._id && ( // Check if the current user is the author
                <button onClick={() => deletePost(post._id)}>Delete</button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="feedback-section">
        <h2>
          Feedback
          <button onClick={() => setShowFeedbackForm(!showFeedbackForm)} className="add-btn">
            +
          </button>
        </h2>
        {showFeedbackForm && (
          <div className="feedback-form">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write your feedback here..."
            />
            <button onClick={submitFeedback}>Submit Feedback</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomeScreen;