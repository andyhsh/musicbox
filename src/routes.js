import React, { Component } from 'react';
import { Provider } from 'react-redux';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Sidebar from './containers/Sidebar';
import PlayerManager from './containers/PlayerManager';
import initStore from './store/store';

// get rid off default touch screen time lag for detection of double taps
injectTapEventPlugin();

// Initiate Store
const store = initStore();

// Subscribe to state changes in redux
store.subscribe(() => {
  store.getState();
});

class Routes extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div className="App">
            <Sidebar />
            <PlayerManager />
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default Routes;
