import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ChannelHeader from '../containers/ChannelHeader';
import YoutubePlayer from '../components/YoutubePlayer';
import { nextPlaylist, deletePlaylist } from '../actions/playlist';

import '../styles/channel.css';

class Channel extends Component {

  renderYoutubePlayer() {
    const currentVideoId = this.props.playlist[0].videoId;
    return <YoutubePlayer videoId={currentVideoId} nextPlaylist={this.props.nextPlaylist} />;
  }

  render() {
    return (
      <div>
        <ChannelHeader />
        <div className="youtube-player-container">
          { this.props.playlist.length !== 0 ?
            this.renderYoutubePlayer() :
            <p className="empty-playlist">Please add a song. This is channel {this.props.match.params.channel}.</p> }
        </div>
      </div>
    );
  }
}

Channel.propTypes = {
  playlist: PropTypes.array.isRequired,
  nextPlaylist: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    playlist: state.playlist,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    nextPlaylist: (videoId) => { dispatch(nextPlaylist(videoId)); },
    deletePlaylist: (index) => { dispatch(deletePlaylist(index)); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
