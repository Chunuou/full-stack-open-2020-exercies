import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ addOne }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreate = (event) => {
    event.preventDefault();
    addOne({ title, author, url });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        title:
        <input id="title" type="text" name="title" value={title} onChange={({ target }) => setTitle(target.value)} />
        <br />
        author:
        <input
          id="author"
          type="text"
          name="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br />
        url:
        <input id="url" type="text" name="url" value={url} onChange={({ target }) => setUrl(target.value)} />
        <br />
        <button id="create-blog" type="submit">create</button>
      </form>
    </>
  );
};

BlogForm.propTypes = {
  addOne: PropTypes.func.isRequired,
};

export default BlogForm;
