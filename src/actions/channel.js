/* * *
 * ACTIONS FOR CHANNEL REDUCER
 * * */
export function joinChannel(channelId) {
  return {
    type: 'JOIN_CHANNEL',
    payload: channelId,
  };
}

export function exitChannel() {
  return {
    type: 'EXIT_CHANNEL',
  };
}
