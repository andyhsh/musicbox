import { ADD_PLAYLIST, DELETE_PLAYLIST, NEXT_PLAYLIST, INITIAL_STATE } from '../actions/constants';

export const playlistReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PLAYLIST:
      return {
        ...state,
        playList: [...state.playList, action.payload],
      };
    case DELETE_PLAYLIST:
      return {
        ...state,
        playList: [...state.playList, action.payload],
      };
    case NEXT_PLAYLIST:
      return {
        ...state,
        playList: [...state.playList].slice(1),
      };
    default:
      return state;
  }
};
