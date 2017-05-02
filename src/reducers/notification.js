
const notificationReducer = (state = '', action) => {
  switch (action.type) {

    case 'ADD_VIDEO_NOTIFICATION':
      return action.payload;

    case 'ADD_VIDEO_NOTIFICATION_DISMISS':
      return '';

    default:
      return state;
  }
};

export default notificationReducer;
