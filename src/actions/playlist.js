import Firebase from '../firebase';

const firebaseDB = Firebase.database();

/* * *
 * ACTIONS DISPATCHED FROM OTHER ACTION CREATORS
 * * */

function addVideoSuccess(video) {
  return {
    type: 'ADD_VIDEO_SUCCESS',
    payload: video,
  };
}

function addVideoError() {
  return {
    type: 'ADD_VIDEO_ERROR',
  };
}

function removeVideoSuccess(id) {
  return {
    type: 'REMOVE_VIDEO_SUCCESS',
    payload: id,
  };
}

function removeVideoError() {
  return {
    type: 'REMOVE_VIDEO_ERROR',
  };
}

function resetState() {
  return {
    type: 'RESET_STATE',
  };
}

function sortPlaylistSuccess(updatedStarCountVideo) {
  return {
    type: 'SORT_PLAYLIST_SUCCESS',
    payload: updatedStarCountVideo,
  };
}

/* * *
 * ACTIONS DISPATCHED FROM COMPONENTS DIRECTLY
 * * */

export function subscribeToPlaylist(toggle, channelId) {
  return dispatch => {
    const channelRef = firebaseDB.ref(`/channels/${channelId}`);

    if (toggle) {
      console.log('subscribing to playlist');
      channelRef.on('child_added', snapshot => {
        // flatten firebase object for redux state
        const video = {
          id: snapshot.key,
          videoId: snapshot.val().videoId,
          user: snapshot.val().user,
          stars: snapshot.val().stars,
          starCount: snapshot.val().starCount,
        }
        dispatch(addVideoSuccess(video));
      })

      // listen for delete in message and return the deleted message's unique ID
      channelRef.on('child_removed', snapshot => {
        dispatch(removeVideoSuccess(snapshot.key));
      })

      // listen for changes in starCount and return the updated starCount
      channelRef.on('child_changed', snapshot => {
        const updatedStarCountVideo = {
          id: snapshot.key,
          starCount: snapshot.val().starCount
        };
        dispatch(sortPlaylistSuccess(updatedStarCountVideo));
      })

      channelRef.once('value', snapshot => {
        dispatch(sortPlaylistSuccess());
      })
    } else if (!toggle) {
      console.log('unsubscribing to playlist');
      // reset state and turn off all firebase event listeners
      channelRef.off('child_added');
      channelRef.off('child_removed');
      channelRef.off('value');
      dispatch(resetState());
    }
  };
}

export function addVideo(videoId, channelId, user) {
  return dispatch => {
    const channelRef = firebaseDB.ref(`/channels/${channelId}`);
    channelRef.push({
      videoId,
      user,
      // stars: { userId: null/true, userId: null/true ...}
      stars: { user: 'bool' },
      starCount: 0,
    })
    .catch(error => {
      console.log(error);
      dispatch(addVideoError());
    });
  };
}

export function removeVideo(id, channelId) {
  return dispatch => {
    const channelRef = firebaseDB.ref(`/channels/${channelId}`);
    channelRef.child(id).remove()
    .catch(error => {
      console.log(error);
      dispatch(removeVideoError());
    });
  };
}

// Star by users. Each individual user can only star a song ONCE.
// Keep track of total stars a song has received through message.stars
export function starVideo(id, channelId, userId) {
  return dispatch => {
    const channelRef = firebaseDB.ref(`/channels/${channelId}`);
    channelRef.child(id).transaction(video => {
      if (video) {
        // check whether user has starred the message already
        // If the user has starred it already, "unstar" it
        if (video.stars[userId]) {
          video.starCount--;
          video.stars[userId] = null;
        } else {
          video.starCount++;
          video.stars[userId] = true;
        }
      }
      return video;
    });
  };
}
