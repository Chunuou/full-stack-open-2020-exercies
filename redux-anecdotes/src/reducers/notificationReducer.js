const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification;
    case 'REMOVE_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

export const setNotification = (content, time) => {
  return (dispatch, getSate) => {
    let { notification } = getSate();
    if (notification) {
      clearTimeout(notification.timeoutID);
    }

    const timeoutID = setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
      });
    }, time * 1000);

    dispatch({
      type: 'SET_NOTIFICATION',
      notification: {
        content,
        timeoutID,
      },
    });
  };
};

export default reducer;
