// client/src/components/PostList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// import '../assets/style/postList.css';

const PostList = ({ posts, user, likePost, deletePost }) => {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post._id}>
          <Link to={`/profile/${post.user?._id}`}>
            <strong>{post.user?.userName}</strong>
          </Link>
          <p>{post.content}</p>
          {post.image && <img src={`/api/uploads/${post.image}`} alt="Post" />}
          <p>Likes: {post.likes.length}</p>
          <button onClick={() => likePost(post._id)}>Like</button>
          {user && post.user ? (
            <>
              {console.log('Logged-in user:', user)}
              {console.log('Post user:', post.user)}
              {user._id === post.user._id ? (
                <>
                  {console.log('Displaying delete button for post ID:', post._id)}
                  <button onClick={() => deletePost(post._id)}>Delete</button>
                </>
              ) : (
                console.log('Not displaying delete button for post ID:', post._id, 'because user._id does not match post.user._id')
              )}
            </>
          ) : (
            <>
              {console.log('User is:', user)}
              {console.log('Post user is:', post.user)}
              {console.log('Not displaying delete button for post ID:', post._id, 'because user or post.user is missing')}
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default PostList;