import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Sidebar from 'react-sidebar';
import ChannelHeader from '../containers/ChannelHeader';
import Sidebar2 from '../containers/Sidebar2';
import YoutubePlayer from '../components/YoutubePlayer';
import { joinChannel, exitChannel } from '../actions/channel';
import { subscribeToPlaylist, removeVideo } from '../actions/playlist';

import '../styles/channel.css';

class Channel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true,
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.onSetSidebarOpenButton = this.onSetSidebarOpenButton.bind(this);
  }

  // Toggle on and off subscription, second parameter coming from URL route
  componentDidMount() {
    this.props.subscribeToPlaylist(true, this.props.match.params.channel);
    this.props.joinChannel(this.props.match.params.channel);
  }

  componentWillUnmount() {
    this.props.subscribeToPlaylist(false, this.props.match.params.channel);
    this.props.exitChannel();
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  onSetSidebarOpenButton() {
    this.onSetSidebarOpen(!this.state.sidebarOpen);
  }

  renderYoutubePlayer() {
    const currentVideoId = this.props.playlist[0].videoId;
    return (
      <YoutubePlayer
        videoId={currentVideoId}
        removeVideo={this.props.removeVideo}
        channel={this.props.match.params.channel}
      />
    );
  }

  render() {
    const sidebarContent = <Sidebar2 />;

    return (
      <div>
        <ChannelHeader onSetSidebarOpenButton={this.onSetSidebarOpenButton} />
        <div className="youtube-player-container">
          { this.props.playlist.length !== 0 ?
            this.renderYoutubePlayer() :
            <p className="empty-playlist">
              Please add a song. This is channel # {this.props.match.params.channel}.
            </p> }
        </div>
        <Sidebar
          sidebar={sidebarContent}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          pullRight>
          <b>Main content</b>
        </Sidebar>
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
    subscribeToPlaylist: (toggle, channel) => { dispatch(subscribeToPlaylist(toggle, channel)); },
    removeVideo: (id, channel) => { dispatch(removeVideo(id, channel)); },
    // starVideo: (id, channel, userId) => { dispatch(starVideo(id, channel, userId)); },
    joinChannel: (channel) => { dispatch(joinChannel(channel)); },
    exitChannel: () => { dispatch(exitChannel()); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
