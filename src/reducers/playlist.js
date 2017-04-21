import { ADD_PLAYLIST, DELETE_PLAYLIST, NEXT_PLAYLIST, INITIAL_STATE } from '../actions/constants';

export const playlistReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PLAYLIST:
      return {
        playList: [...state.playList, action.payload],
      };
    case DELETE_PLAYLIST: {
      const newState = [...state.playList];
      const indexToDelete = newState.findIndex(video => {
        // payload is videoId string, to match with videoId prop of video
        return action.payload === video.videoId;
      });
      newState.splice(indexToDelete, 1);
      return {
        playList: newState,
      };
    }
    case NEXT_PLAYLIST:
      return {
        playList: [...state.playList].slice(1),
      };
    default:
      return state;
  }
};
