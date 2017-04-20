import React, { Component } from 'react';
import { Provider } from 'react-redux';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import YoutubeVideo from './components/Player';
import Sidebar from './containers/Sidebar';
import initStore from './store/store';

// get rid off default touch screen time lag for detection of double taps
injectTapEventPlugin();

// Initiate Store
const store = initStore();

// Subscribe to state changes in redux
store.subscribe(() => {
  const state = store.getState();
  console.log('New State', state);
});

class Routes extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div className="App">
            <Sidebar />
            <YoutubeVideo />
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default Routes;
