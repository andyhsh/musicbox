import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // handles async calls in redux
import logger from 'redux-logger'; // useful log messages for redux state changes
import playlistReducer from '../reducers/playlist';
import userReducer from '../reducers/user';
import channelReducer from '../reducers/channel';
import notificationReducer from '../reducers/notification';

const initStore = () => {

  const rootReducer = combineReducers({
    // playlist: [
    //   {
    //     id: '',
    //     videoId: '',
    //     user: '',
    //     stars: { user: bool },
    //     starCount: value
    //   }, ... ],
    // user: {
    //   displayName: '',
    //   uid: '',
    //   isUserSignedIn: bool,
    //   hasError: bool,
    //   errorMessage: ''
    // },
    // channel: '',
    playlist: playlistReducer,
    user: userReducer,
    channel: channelReducer,
    notification: notificationReducer,
  });

  const store = createStore(rootReducer, compose(
    applyMiddleware(thunk, logger),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ));

  return store;
};

export default initStore;
