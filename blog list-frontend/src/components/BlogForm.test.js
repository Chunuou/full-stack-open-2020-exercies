import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from './BlogForm';

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const addOne = jest.fn();

  const component = render(<BlogForm addOne={addOne} />);

  const input1 = component.container.querySelector('#title');
  const input2 = component.container.querySelector('#author');
  const input3 = component.container.querySelector('#url');
  const form = component.container.querySelector('form');

  fireEvent.change(input1, {
    target: { value: 'blog title' },
  });
  fireEvent.change(input2, {
    target: { value: 'blog author' },
  });
  fireEvent.change(input3, {
    target: { value: 'blog url' },
  });
  fireEvent.submit(form);

  expect(addOne.mock.calls).toHaveLength(1);
  expect(addOne.mock.calls[0][0]).toEqual({ title: 'blog title', author: 'blog author', url: 'blog url' });
});
