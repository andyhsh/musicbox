const playlistReducer = (state = [], action) => {
  switch (action.type) {

    case 'ADD_VIDEO_SUCCESS':
      return [
        ...state, action.payload
      ];

    case 'REMOVE_VIDEO_SUCCESS':
      const newState = [...state];
      // find the index video that matches the unique id object to delete
      const indexToDelete = newState.findIndex(video => {
        return action.payload === video.id;
      });
      newState.splice(indexToDelete, 1);
      return newState;

    // receive an updated starCount, to apply that property by matching with the correct Unique ID
    case 'SORT_PLAYLIST_SUCCESS':
      let sortState = [...state];
      if (action.payload) {
        // find the index video that matches the updated unique id object
        const indexToUpdate = sortState.findIndex(video => {
          return action.payload.id === video.id;
        });
        // update the unique id object with the new starCount
        sortState[indexToUpdate].starCount = action.payload.starCount
      }
      // sort the list of videos by the value of starCount
      sortState.sort((a, b) => {
        return b.starCount - a.starCount;
      });
      return sortState;

    case 'RESET_STATE':
      return [];

    default:
      return state;
  }
};

export default playlistReducer;
