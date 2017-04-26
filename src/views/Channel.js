import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ChannelHeader from '../containers/ChannelHeader';
import YoutubePlayer from '../components/YoutubePlayer';
import { removeVideo, subscribeToPlaylist, starVideo } from '../actions/playlist';
import { joinChannel, exitChannel } from '../actions/channel';

import '../styles/channel.css';

class Channel extends Component {

  // Toggle on and off subscription, second parameter coming from URL 'this.props.match.params.id'
  componentDidMount() {
    this.props.subscribeToPlaylist(true, this.props.match.params.channel);
    this.props.joinChannel(this.props.match.params.channel);
  }

  componentWillUnmount() {
    this.props.subscribeToPlaylist(false, this.props.match.params.channel);
    this.props.exitChannel();
  }

  renderYoutubePlayer() {
    const currentVideoId = this.props.playlist[0].videoId;
    return (
      <YoutubePlayer
        videoId={currentVideoId}
        removeVideo={this.props.removeVideo}
        channelId={this.props.match.params.channel}
      />
    );
  }

  render() {
    return (
      <div>
        <ChannelHeader />
        <div className="youtube-player-container">
          { this.props.playlist.length !== 0 ?
            this.renderYoutubePlayer() :
            <p className="empty-playlist">
              Please add a song. This is channel # {this.props.match.params.channel}.
            </p> }
        </div>
      </div>
    );
  }
}

Channel.propTypes = {
  playlist: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  removeVideo: PropTypes.func.isRequired,
  subscribeToPlaylist: PropTypes.func.isRequired,
  // starVideo: PropTypes.func.isRequired,
  joinChannel: PropTypes.func.isRequired,
  exitChannel: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    playlist: state.playlist,
    channel: state.channel,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    subscribeToPlaylist: (toggle, channelId) => { dispatch(subscribeToPlaylist(toggle, channelId)); },
    removeVideo: (id, channelId) => { dispatch(removeVideo(id, channelId)); },
    // starVideo: (id, channelId, userId) => { dispatch(starVideo(id, channelId, userId)); },
    joinChannel: (channelId) => { dispatch(joinChannel(channelId)); },
    exitChannel: () => { dispatch(exitChannel()); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
