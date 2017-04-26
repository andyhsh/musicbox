// data structure = {id: '' name: ''}
const channelReducer = (state = '', action) => {
  switch (action.type) {
    case 'JOIN_ROOM':
      return action.payload;
    case 'EXIT_ROOM':
      return '';
    default:
      return state;
  }
};

export default channelReducer;
