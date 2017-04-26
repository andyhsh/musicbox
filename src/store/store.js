import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // handles async calls in redux
import logger from 'redux-logger'; // useful log messages for redux state changes
import playlistReducer from '../reducers/playlist';
import userReducer from '../reducers/user';
import channelReducer from '../reducers/channel';

const initStore = () => {
  // combine all reducers to form initStore
  const rootReducer = combineReducers({
    playlist: playlistReducer,
    user: userReducer,
    channel: channelReducer, // channel: ''
  });

  const store = createStore(rootReducer, compose(
    applyMiddleware(thunk, logger),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ));

  return store;
};

export default initStore;
