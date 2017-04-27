import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'material-ui/List';

import Queue from '../components/Queue';

class Playlist extends Component {

  renderPlaylist() {
    return this.props.playlist.map((video, index) => {
      // TODO: add username property
      return (
        <Queue
          key={index}
          id={index}
          videoId={video.videoId}
          title={video.title}
          thumb={video.thumb}
          deletePlaylist={this.props.deletePlaylist}
        />
      );
    });
  }

  render() {
    return (
      <List>
        {this.renderPlaylist()}
      </List>
    );
  }
}

Playlist.propTypes = {
  playlist: PropTypes.array.isRequired,
  deletePlaylist: PropTypes.func.isRequired,
};

export default Playlist;
