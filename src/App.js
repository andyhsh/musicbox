import React, { Component } from 'react';
import Player from './components/Player';
import YTsearch from './components/YTsearch';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <YTsearch />
        <Player />
      </div>
    );
  }
}

export default App;
