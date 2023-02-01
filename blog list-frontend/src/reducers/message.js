const messageReducer = (state = null, action) => {
  if (action.type === 'NEW_MESSAGE') {
    return action.message;
  }
  if (action.type === 'DROP_MESSAGE') {
    return null;
  }
  return state;
};

export const newMessage = (message) => ({
  type: 'NEW_MESSAGE',
  message,
});

export const dropMessage = () => ({ type: 'DROP_MESSAGE' });

export default messageReducer;
