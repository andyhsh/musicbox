const ADD_PLAYLIST = 'ADD_PLAYLIST';
const DELETE_PLAYLIST = 'DELETE_PLAYLIST';
const INITIAL_STATE = {
  currentVideo: {
    title: '',
    videoId: '',
    thumb: '',
    user: '',
  },
  playList: [],
};

export { ADD_PLAYLIST, DELETE_PLAYLIST, INITIAL_STATE };
