import React, { Component } from 'react';
import Queue from '../components/Queue';

class Playlist extends Component {
  render() {
    return (
      <div>
        <Queue />
        <Queue />
        <Queue />
        <Queue />
      </div>
    );
  }
}

export default Playlist;
