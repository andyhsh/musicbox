import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import ChannelHeader from '../containers/ChannelHeader';
import Menu from '../containers/Menu';
import YoutubePlayer from '../components/YoutubePlayer';
import NewVideoNotification from '../components/NewVideoNotification';
import { joinChannel, exitChannel } from '../actions/channel';
import { subscribeToPlaylist, removeVideo } from '../actions/playlist';

import '../styles/channel.css';

class Channel extends Component {
  constructor(props) {
    super(props);
    this.setMenuButton = this.setMenuButton.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.goActive = this.goActive.bind(this);
    this.goInactive = this.goInactive.bind(this);
    this.timeoutId = null;
    this.state = {
      menuOpen: false,
      renderMenuButtons: false,
    };
  }

  // Toggle on and off subscription, second parameter coming from URL route
  componentDidMount() {
    this.props.subscribeToPlaylist(true, this.props.match.params.channel);
    this.props.joinChannel(this.props.match.params.channel);
    // const container = document.getElementById('channel-container');
    window.addEventListener('mousemove', this.resetTimer);
    this.startTimer();
  }

  componentWillUnmount() {
    this.props.subscribeToPlaylist(false, this.props.match.params.channel);
    this.props.exitChannel();
    // const container = document.getElementById('channel-container');
    window.removeEventListener('mousemove', this.resetTimer);
  }

  setMenuButton() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  // Render Youtubeplayer player after checking if any playlist added
  renderYoutubePlayer() {
    const { videoId, id } = this.props.playlist[0];

    return (
      <YoutubePlayer
        onMouseOver={this.handleHover}
        id={id}
        videoId={videoId}
        removeVideo={this.props.removeVideo}
        channel={this.props.match.params.channel}
      />
    );
  }

  startTimer() {
    // call goInactive after no movement
    this.timeoutId = window.setTimeout(this.goInactive, 3000);
  }

  resetTimer() {
    window.clearTimeout(this.timeoutId);
    this.goActive();
  }

  goActive() {
    this.setState({ renderMenuButtons: true });
    this.startTimer();
  }

  goInactive() {
    this.setState({ renderMenuButtons: false });
  }

  renderChannelHeader() {
    if (this.state.renderMenuButtons) {
      return <ChannelHeader setMenuButton={this.setMenuButton} />;
    }
  }

  renderNewVideoNotification() {
    // notification state should be set to true when a user adds a video
    if (this.notification) {
      return <NewVideoNotification track={'James Blake - The Wilhelm Scream'} user={'Andy Ho'} />;
    }
  }

  render() {
    return (
      <div id="channel-container">
        <CSSTransitionGroup
          transitionName="channel-header"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}>
          {this.renderChannelHeader()}
        </CSSTransitionGroup>
        {this.renderNewVideoNotification()}
        {/* Render Youtubeplayer if playlist exists and media is iPad or bigger */}
        <MediaQuery minDeviceWidth={768}>
          <div className="youtube-player-container">
            { this.props.playlist[0] !== undefined ?
              this.renderYoutubePlayer() :
              <p className="empty-playlist">
                Please add a song. This is channel # {this.props.match.params.channel}.
              </p> }
          </div>
        </MediaQuery>
        {/* Menu is rendered on toggle button */}
        <MediaQuery minDeviceWidth={768}>
          <CSSTransitionGroup
            transitionName="menu"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={200}>
            {this.state.menuOpen && <Menu setMenuButton={this.setMenuButton} />}
          </CSSTransitionGroup>
        </MediaQuery>
        {/* Render Menu as default if device is smaller than an iPad */}
        <MediaQuery maxDeviceWidth={767}>
          <Menu setMenuButton={this.setMenuButton} />
        </MediaQuery>
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
    joinChannel: (channel) => { dispatch(joinChannel(channel)); },
    exitChannel: () => { dispatch(exitChannel()); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
