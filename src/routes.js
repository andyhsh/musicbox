import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import YoutubeVideo from './components/Player';
import Sidebar from './containers/Sidebar';

injectTapEventPlugin();

class Routes extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="App">
          <Sidebar />
          <YoutubeVideo />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Routes;
