import firebase from '../firebase';

const firebaseDB = firebase.database();

/* * *
 * CHECKING IS USER IS SIGNED IN ALREADY
 * * */

export function initAuth() {
  return dispatch => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        dispatch(signInSuccess(user));
      }
    });
  };
}

/* * *
 * SIGN IN ACTIONS
 * * */

function signInError(errorMessage) {
  return {
    type: 'SIGN_IN_ERROR',
    payload: errorMessage,
  };
}

function signInSuccess(user) {
  return {
    type: 'SIGN_IN_SUCCESS',
    payload: user,
  };
}

export function signIn(socialMedia) {
  return dispatch => {
    let provider;
    if (socialMedia === 'facebook') {
      provider = new firebase.auth.FacebookAuthProvider();
    } else if (socialMedia === 'google-plus') {
      provider = new firebase.auth.GoogleAuthProvider();
    } else if (socialMedia === 'twitter') {
      provider = new firebase.auth.TwitterAuthProvider();
    }

    firebase.auth().signInWithPopup(provider).then(function (result) {
      debugger;
      const { uid, displayName, email } = result.user;

      // update firebase with signed in user details
      firebaseDB.ref(`users/${uid}`).set({
        displayName,
        email,
        uid,
      });
      // pass in UID and displayName to update redux state
      dispatch(signInSuccess({ displayName, uid }));
    }).catch(error => {
      if (error.code === 'auth/account-exists-with-different-credential') {
        const message = 'Account already exists. Please sign in using the previous provider.';
        return dispatch(signInError(message));
      }
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

function signOutSuccess() {
  return {
    type: 'SIGN_OUT_SUCCESS',
  };
}

export function signOut() {
  return dispatch => {
    firebase.auth().signOut()
      .then(() => {
        dispatch(signOutSuccess());
      }).catch(error => {
        dispatch(signOutError(error.message));
      });
  };
}
