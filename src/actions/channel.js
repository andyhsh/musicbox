/* * *
 * ACTIONS FOR CHANNEL REDUCER
 * * */
export function joinChannel(channel) {
  return {
    type: 'JOIN_CHANNEL',
    payload: channel,
  };
}

export function exitChannel() {
  return {
    type: 'EXIT_CHANNEL',
  };
}
