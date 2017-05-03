
const nowPlayingReducer = (state = '', action) => {
  switch (action.type) {

    case 'NOW_PLAYING':
      return action.payload;

    case 'NOW_PLAYING_DISMISS':
      return '';

    default:
      return state;
  }
};

export default nowPlayingReducer;
