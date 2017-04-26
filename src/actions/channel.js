/* * *
 * ACTIONS FOR CHANNEL REDUCER
 * * */
export function joinRoom(roomId) {
  return {
    type: 'JOIN_ROOM',
    payload: roomId,
  };
}

export function exitRoom() {
  return {
    type: 'EXIT_ROOM',
  };
}
