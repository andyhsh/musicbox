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

// User subscribes to playlist upon entering a channel
// Boolean is passed through as a toggle
export function subscribeToPlaylist(toggle, channel) {
  return dispatch => {
    const channelRef = firebaseDB.ref(`/channels/${channel}`);

    if (toggle) {
      console.log('subscribing to playlist');
      // listen for any new videos queued. Flatten the properties so that the unique ID
      // is easily referenced and immediately dispatch to update redux state
      channelRef.on('child_added', snapshot => {
        const video = {
          id: snapshot.key,
          videoId: snapshot.val().videoId,
          user: snapshot.val().user,
          stars: snapshot.val().stars,
          starCount: snapshot.val().starCount,
        }
        dispatch(addVideoSuccess(video));
      })

      // listen for delete in message and return the deleted video's unique ID
      // dispatch action to update redux state by using the UID to match video
      channelRef.on('child_removed', snapshot => {
        dispatch(removeVideoSuccess(snapshot.key));
      })

      // listen for changes in starCount and return the updated starCount
      // dispatch action with the updated video and starCount value to perform sorting
      channelRef.on('child_changed', snapshot => {
        const updatedStarCountVideo = {
          id: snapshot.key,
          starCount: snapshot.val().starCount
        };
        dispatch(sortPlaylistSuccess(updatedStarCountVideo));
      })

      // On subscription, immediately sort the playlist
      // to ensure that order of playlist is in sync with everyone else in the channel
      channelRef.once('value', snapshot => {
        dispatch(sortPlaylistSuccess());
      })
    } else if (!toggle) {
      console.log('unsubscribing to playlist');
      // reset state and turn off all firebase event listeners when user exits the channel
      channelRef.off('child_added');
      channelRef.off('child_removed');
      channelRef.off('value');
      dispatch(resetState());
    }
  };
}

// First push new video data to firebase channel. This will invoke
// the firebase event listener to dispatch action to update redux state afterwards.
export function addVideo(videoId, channel, user) {
  return dispatch => {
    const channelRef = firebaseDB.ref(`/channels/${channel}`);
    channelRef.push({
      videoId,
      user,
      // stars: { userId: null/true, userId: null/true ...}
      // object key is purely used as a placeholder to access as a property of user.
      stars: { user: 'placeholder' },
      starCount: 0,
    })
    .catch(error => {
      console.log(error);
      dispatch(addVideoError());
    });
  };
}

// First remove video data from firebase channel. This will invoke
// the firebase event listener to dispatch action to update redux state afterwards.
export function removeVideo(id, channel) {
  return dispatch => {
    const channelRef = firebaseDB.ref(`/channels/${channel}`);
    channelRef.child(id).remove()
    .catch(error => {
      console.log(error);
      dispatch(removeVideoError());
    });
  };
}

// Star by users. Each individual user can only star a song ONCE.
// Keep track of whether a user has already starred with video.stars
// Keep track of total stars a song has received through video.starCount
export function starVideo(id, channel, userId) {
  return dispatch => {
    const channelRef = firebaseDB.ref(`/channels/${channel}`);
    channelRef.child(id).transaction(video => {
      if (video) {
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
