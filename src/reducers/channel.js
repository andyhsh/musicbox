// data structure = {id: '' name: ''}
const channelReducer = (state = '', action) => {
  switch (action.type) {
    case 'JOIN_CHANNEL':
      return action.payload;
    case 'EXIT_CHANNEL':
      return '';
    default:
      return state;
  }
};

export default channelReducer;
