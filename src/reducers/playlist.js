import { FETCH_PLAYLIST, ADD_PLAYLIST, DELETE_PLAYLIST, NEXT_PLAYLIST, INITIAL_STATE } from '../actions/constants';

export const playlistReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PLAYLIST:
      return {
        playlist: action.payload
      };

    case ADD_PLAYLIST:
      return [...state, action.payload];

    // match the videoId target with videoId in the state to find the index
    // then use the index to splice the state and return the new state
    case DELETE_PLAYLIST: {
      const newState = [...state];
      const indexToDelete = newState.findIndex(video => {
        return action.payload === video.videoId;
      });
      newState.splice(indexToDelete, 1);
      return newState;
    }

    case NEXT_PLAYLIST:
      return [...state].slice(1);

    default:
      return state;
  }
};
