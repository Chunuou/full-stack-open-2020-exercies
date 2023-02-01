import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

test('renders content', () => {
  const blog = {
    title: 'blog title',
    author: 'blog author',
    likes: 0,
    url: 'blog url',
    user: {
      id: 'userid',
    },
  };

  const user = {
    id: 'userid',
  };

  const getALl = () => {};

  const component = render(<Blog user={user} blog={blog} getAll={getALl} />);

  const mockHandler = jest.fn();

  const button = component.getByText('like');
  fireEvent.click(button);
  fireEvent.click(button);
  
  expect(mockHandler.mock.calls).toHaveLength(2);
  expect(component.container).toHaveTextContent('blog url');
  expect(component.container).toHaveTextContent('likes 0');
});
