import { FETCH_PLAYLIST, ADD_PLAYLIST, DELETE_PLAYLIST, NEXT_PLAYLIST } from './constants';
import firebaseDB from '../firebase';

const playlistRef = firebaseDB.ref('/playlist');

// video object should be structured as {title: '', videoId: '', thumb: '', user: ''}
export function fetchPlaylist() {
  return dispatch => {
    playlistRef.on('value', snapshot => {
      dispatch({
        type: FETCH_PLAYLIST,
        payload: snapshot.val(),
      });
    });
  };
}

// video object = { title: '', videoId: '', thumb: '', user: '' }
export function addPlaylist(video) {
  // return dispatch => playlistRef.push(video);
  return {
    type: ADD_PLAYLIST,
    payload: video,
  };
}

export function deletePlaylist(videoId) {
  // return dispatch => playlistRef.child(videoId).remove();
  return {
    type: DELETE_PLAYLIST,
    payload: videoId,
  };
}

export function nextPlaylist(videoId) {
  // return dispatch => playlistRef.child(videoId).remove();
  return {
    type: NEXT_PLAYLIST,
  };
}
