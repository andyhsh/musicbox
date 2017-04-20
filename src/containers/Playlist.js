import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Queue from '../components/Queue';

class Playlist extends Component {
  renderPlaylist() {
    return this.props.playlist.map(video => {
      // TODO: add username property
      return (
        <Queue
          key={video.videoId}
          title={video.title}
          thumb={video.thumb}
        />
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderPlaylist()}
      </div>
    );
  }
}

Playlist.propTypes = {
  playlist: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    playlist: state.playlist.playList,
  };
};

// TODO: to map dispatch actions to individual queue components
// actions include: Upvote and downvote of video

export default connect(mapStateToProps)(Playlist);
