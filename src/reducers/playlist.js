const playlistReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MESSAGE_SUCCESS':
      return [
        ...state, action.payload
      ];

    case 'REMOVE_MESSAGE_SUCCESS':
      const newState = [...state];
      // find the index message that matches the unique id object to delete
      const indexToDelete = newState.findIndex(message => {
        return action.payload === message.id;
      });
      newState.splice(indexToDelete, 1);
      return newState;

    // receive an updated starCount, to apply that property by matching with the correct Unique ID
    case 'SORT_MESSAGE_SUCCESS':
      let sortState = [...state];
      if (action.payload) {
        // find the index message that matches the updated unique id object
        const indexToUpdate = sortState.findIndex(message => {
          return action.payload.id === message.id;
        });
        // update the unique id object with the new starCount
        sortState[indexToUpdate].starCount = action.payload.starCount
      }
      // sort the list of objects by the value of starCount
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
