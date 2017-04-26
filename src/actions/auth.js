import firebase from '../firebase';

const firebaseDB = firebase.database();

/* * *
 * SIGN IN ACTIONS
 * * */

function signInError(errorMessage) {
  return {
    type: 'SIGN_IN_ERROR',
    payload: errorMessage,
  };
}

function signInSuccess(displayName) {
  return {
    type: 'SIGN_IN_SUCCESS',
    payload: displayName,
  };
}

export function signIn(socialMedia) {
  return dispatch => {
    let provider;
    if (socialMedia === 'facebook') {
      provider = new firebase.auth.FacebookAuthProvider();
    } else if (socialMedia === 'google') {
      provider = new firebase.auth.GoogleAuthProvider();
    }

    firebase.auth().signInWithPopup(provider).then(function (result) {
      const { uid, displayName, email } = result.user;

      // update firebase with signed in user details
      firebaseDB.ref(`users/${uid}`).set({
        displayName,
        email,
        uid,
      });
      // update redux state
      dispatch(signInSuccess({ displayName, uid }));
    }).catch(error => {
      dispatch(signInError(error.message));
    });
  };
}

/* * *
 * SIGN OUT ACTIONS
 * * */
function signOutError(errorMessage) {
  return {
    type: 'SIGN_OUT_ERROR',
    payload: errorMessage,
  };
}

function signOutSuccess(displayName) {
  return {
    type: 'SIGN_OUT_SUCCESS',
    payload: displayName,
  };
}

export function signOut() {
  return dispatch => {
    firebase.auth().signOut().then(() => {
      dispatch(signOutSuccess());
    }).catch(error => {
      dispatch(signOutError(error.message));
    });
  };
}
