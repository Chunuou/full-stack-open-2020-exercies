import React, { useState } from 'react';
import PropTypes from 'prop-types';
import blogService from '../services/blogs';

const Blog = ({ user, blog, getAll }) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = {
    display: visible ? '' : 'none',
  };

  const buttonlabel = visible ? 'hide' : 'show';

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = async () => {
    const newBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    await blogService.updateOne(blog.id, newBlog);
    getAll();
  };

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteOne(blog.id);
      getAll();
    }
  };

  return (
    <div style={{ border: '1px solid', margin: '5px', padding: '5px' }}>
      {blog.title + ' '}
      <button onClick={toggleVisibility}>{buttonlabel}</button>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes}
          <button onClick={handleLike}>like</button>
        </p>
        <p>{blog.author}</p>
        {user.id === blog.user.id && <button onClick={handleDelete}>delete</button>}
      </div>
    </div>
  );
};

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  getAll: PropTypes.func.isRequired,
};

export default Blog;
