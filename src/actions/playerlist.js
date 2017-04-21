import { ADD_PLAYLIST, DELETE_PLAYLIST, NEXT_PLAYLIST } from './constants';

// video object should be structured as {title: '', videoId: '', thumb: '', user: ''}
export function addPlaylist(video) {
  return {
    type: ADD_PLAYLIST,
    payload: video,
  };
}

export function deletePlaylist(index) {
  return {
    type: DELETE_PLAYLIST,
    payload: index,
  };
}

export function nextPlaylist() {
  return {
    type: NEXT_PLAYLIST,
  };
}
