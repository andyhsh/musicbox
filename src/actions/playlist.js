import firebase from 'firebase';
import { FIREBASE_CONFIG } from '../../config';

// Set up firebase and initialise
firebase.initializeApp(FIREBASE_CONFIG);
const firebaseDB = firebase.database();

/* * *
 * ACTIONS DISPATCHED FROM OTHER ACTION CREATORS
 * * */

function addMessageSuccess(message) {
  return {
    type: 'ADD_MESSAGE_SUCCESS',
    payload: message,
  };
}

function addMessageError() {
  return {
    type: 'ADD_MESSAGE_ERROR',
  };
}

function removeMessageSuccess(id) {
  return {
    type: 'REMOVE_MESSAGE_SUCCESS',
    payload: id,
  };
}

function removeMessageError() {
  return {
    type: 'REMOVE_MESSAGE_ERROR',
  };
}

function resetState() {
  return {
    type: 'RESET_STATE',
  };
}

function sortMessageSuccess(updatedStarCountMessage) {
  return {
    type: 'SORT_MESSAGE_SUCCESS',
    payload: updatedStarCountMessage,
  };
}

/* * *
 * ACTIONS DISPATCHED FROM COMPONENTS DIRECTLY
 * * */

export function subscribeToMessages(toggle, roomId) {
  return dispatch => {
    const messageRef = firebaseDB.ref(`/rooms/${roomId}`);

    if (toggle) {
      console.log('subscribing to messages');
      messageRef.on('child_added', snapshot => {
        // flatten firebase object for redux state
        const message = {
          id: snapshot.key,
          text: snapshot.val().text,
          user: snapshot.val().user,
          stars: snapshot.val().stars,
          starCount: snapshot.val().starCount,
        }
        dispatch(addMessageSuccess(message));
      })

      // listen for delete in message and return the deleted message's unique ID
      messageRef.on('child_removed', snapshot => {
        dispatch(removeMessageSuccess(snapshot.key));
      })

      // listen for changes in starCount and return the updated starCount
      messageRef.on('child_changed', snapshot => {
        const updatedStarCountMessage = {
          id: snapshot.key,
          starCount: snapshot.val().starCount
        };
        dispatch(sortMessageSuccess(updatedStarCountMessage));
      })

      messageRef.once('value', snapshot => {
        dispatch(sortMessageSuccess());
      })
    } else if (!toggle) {
      console.log('unsubscribing to messages');
      // reset state and turn off all firebase event listeners
      messageRef.off('child_added');
      messageRef.off('child_removed');
      messageRef.off('value');
      dispatch(resetState());
    }
  };
}

export function addMessage(message, roomId, user) {
  return dispatch => {
    const messageRef = firebaseDB.ref(`/rooms/${roomId}`);
    messageRef.push({
      text: message,
      user,
      // stars: { userId: null/true, userId: null/true ...}
      stars: { user: 'bool' },
      starCount: 0,
    })
    .catch(error => {
      console.log(error);
      dispatch(addMessageError());
    });
  };
}

export function removeMessage(id, roomId) {
  return dispatch => {
    const messageRef = firebaseDB.ref(`/rooms/${roomId}`);
    messageRef.child(id).remove()
    .catch(error => {
      console.log(error);
      dispatch(removeMessageError());
    });
  };
}

// Star by users. Each individual user can only star a song ONCE.
// Keep track of total stars a song has received through message.stars
export function starMessage(id, roomId, userId) {
  return dispatch => {
    const messageRef = firebaseDB.ref(`/rooms/${roomId}`);
    messageRef.child(id).transaction(message => {
      if (message) {
        // check whether user has starred the message already
        // If the user has starred it already, "unstar" it
        if (message.stars[userId]) {
          message.starCount--;
          message.stars[userId] = null;
        } else {
          message.starCount++;
          message.stars[userId] = true;
        }
      }
      return message;
    });
  };
}
