import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import initStore from './store/store';
import Channel from './views/Channel';
import Home from './views/Home';

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
        <Router>
          <Switch>
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
              <div>
                <Route location={location} path="/:channel" component={Channel} />
                <Route exact path="/" component={Home} />
              </div>
            </MuiThemeProvider>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default Routes;
