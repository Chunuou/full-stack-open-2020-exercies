const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INITAL_BLOG':
      return action.data;
    case 'NEW_BLOG':
      return [...state, action.data];
    case 'DELETE_BLOG':
      return state.filter((blog) => blog.id !== action.data);

    default:
      return state;
  }
};

export const initalBlog = (blogs) => ({
  type: 'INITAL_BLOG',
  data: blogs,
});

export const newBlog = (blog) => ({
  type: 'NEW_BLOG',
  data: blog,
});

export const deleteBlog = (id) => ({
  type: 'DELETE_BLOG',
  data: id,
});

export default blogReducer;
