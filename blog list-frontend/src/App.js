import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Toggle from './components/Toggle';
import blogService from './services/blogs';
import loginService from './services/login';
import { newMessage, dropMessage } from './reducers/message';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const message = useSelector(({ message }) => message);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('user'));

    if (user !== null) {
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const getAll = async () => {
    const blogs = await blogService.getAll();
    setBlogs(
      blogs.sort((a, b) => {
        if (a.likes < b.likes) {
          return 1;
        }
        if (a.likes > b.likes) {
          return -1;
        }
        return 0;
      }),
    );
  };

  useEffect(() => {
    getAll();
  }, []);

  const blogFormRef = useRef();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      setUsername('');
      setPassword('');

      blogService.setToken(user.token);
      window.localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      handleNotification({
        type: 'error',
        message: 'wrong password or username',
      });
    }
  };

  const handleLogout = () => {
    setUser(null);
    blogService.setToken(null);
    window.localStorage.removeItem('user');
  };

  const handleNotification = (messageToShow) => {
    dispatch(newMessage(messageToShow));
    setTimeout(() => {
      dispatch(dropMessage());
    }, 5678);
  };

  const Message = () => {
    return message && <div className={message.type}>{message.message}</div>;
  };

  const addOne = async (blog) => {
    try {
      await blogService.addOne(blog);

      handleNotification({
        type: 'success',
        message: `a new blog ${blog.title} by ${blog.author} added`,
      });

      blogFormRef.current.toggleVisibility();

      const blogs = await blogService.getAll();
      setBlogs(blogs);
    } catch (error) {
      handleNotification({
        type: 'error',
        message: 'error',
      });
    }
  };

  if (user === null) {
    return (
      <>
        <h2>log in to application</h2>
        <Message />
        <Toggle buttonLabel="show log in">
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </Toggle>
      </>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Message />
      <div>
        {user.name} {user.username} logged in <button onClick={handleLogout}>logout</button>
      </div>
      <Toggle buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm addOne={addOne} />
      </Toggle>
      {blogs.map((blog) => (
        <Blog key={blog.id} user={user} blog={blog} getAll={getAll} />
      ))}
    </div>
  );
};

export default App;
