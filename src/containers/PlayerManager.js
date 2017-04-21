import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import YoutubePlayer from '../components/YoutubePlayer';
import { nextPlaylist } from '../actions/playerlist';

import '../styles/player-manager.css';

class PlayerManager extends Component {

  renderYoutubePlayer() {
    const currentVideoId = this.props.playlist[0].videoId;
    return <YoutubePlayer videoId={currentVideoId} nextPlaylist={this.props.nextPlaylist} />;
  }

  render() {
    return (
      <div className="youtube-player-container">
        { this.props.playlist.length > 0 ? this.renderYoutubePlayer() : <p>Please add to playlist</p> }
      </div>
    );
  }
}

PlayerManager.propTypes = {
  playlist: PropTypes.array.isRequired,
  nextPlaylist: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    playlist: state.playlist.playList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    nextPlaylist: () => { dispatch(nextPlaylist()); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerManager);
