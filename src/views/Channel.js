import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import ChannelHeader from '../containers/ChannelHeader';
import Menu from '../containers/Menu';
import YoutubePlayer from '../components/YoutubePlayer';
import NewVideoNotification from '../components/NewVideoNotification';
import NowPlaying from '../components/NowPlaying';
import { joinChannel, exitChannel } from '../actions/channel';
import { subscribeToPlaylist,
  removeVideo,
  dismissNotification,
  addNowPlaying,
  dismissNowPlaying,
} from '../actions/playlist';

import '../styles/channel.css';

class Channel extends Component {
  constructor(props) {
    super(props);
    this.setMenuButton = this.setMenuButton.bind(this);
    this.nextPlaylist = this.nextPlaylist.bind(this);
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
    const container = document.getElementById('channel-overlay');
    container.addEventListener('mousemove', this.resetTimer);
    this.startTimer();
  }

  componentWillUnmount() {
    this.props.subscribeToPlaylist(false, this.props.match.params.channel);
    this.props.exitChannel();
    const container = document.getElementById('channel-overlay');
    container.removeEventListener('mousemove', this.resetTimer);
  }

  setMenuButton() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  // Render Youtubeplayer player after checking if any playlist added
  renderYoutubePlayer() {
    const { videoId, id, track } = this.props.playlist[0];

    return (
      <YoutubePlayer
        onMouseOver={this.handleHover}
        id={id}
        videoId={videoId}
        removeVideo={this.props.removeVideo}
        channel={this.props.match.params.channel}
        addNowPlaying={this.props.addNowPlaying}
        track={track}
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

  // Default state render overlay to detect mouse movement.
  // When the menu is open, render the channel directly instead.
  // toggle active to control z-index

  renderOverlay() {
    if (this.state.menuOpen) {
      return <div id="channel-overlay" />;
    }
    return <div id="channel-overlay" className="active" />;
  }

  nextPlaylist() {
    this.props.removeVideo(this.props.playlist[0].id, this.props.match.params.channel);
  }

  render() {
    return (
      <div id="channel-container">
        {this.renderOverlay()}
        <CSSTransitionGroup
          transitionName="channel-header"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}>
          {this.state.renderMenuButtons && <ChannelHeader setMenuButton={this.setMenuButton} nextPlaylist={this.nextPlaylist} />}
        </CSSTransitionGroup>

        {/* Now Playing track pop up */}
        <MediaQuery minDeviceWidth={768}>
          <CSSTransitionGroup
            transitionName="nowplaying"
            transitionEnterTimeout={400}
            transitionLeaveTimeout={300}>
            {this.props.nowPlaying && <NowPlaying track={this.props.nowPlaying} dismissNowPlaying={this.props.dismissNowPlaying} />}
          </CSSTransitionGroup>
        </MediaQuery>

        {/* Notification pop up for new tracks added */}
        <MediaQuery minDeviceWidth={768}>
          <CSSTransitionGroup
            transitionName="notification-popup"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={400}>
          {this.props.notification && <NewVideoNotification track={this.props.notification.track} user={this.props.notification.user} dismissNotification={this.props.dismissNotification} />}
          </CSSTransitionGroup>
        </MediaQuery>

        {this.state.menuOpen && <ChannelHeader setMenuButton={this.setMenuButton} nextPlaylist={this.nextPlaylist} />}

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

        {/* Render Menu and exit as default if device is smaller than an iPad */}
        <MediaQuery maxDeviceWidth={767}>
          <ChannelHeader setMenuButton={this.setMenuButton} />
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
  joinChannel: PropTypes.func.isRequired,
  exitChannel: PropTypes.func.isRequired,
  dismissNotification: PropTypes.func.isRequired,
  addNowPlaying: PropTypes.func.isRequired,
  dismissNowPlaying: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    playlist: state.playlist,
    channel: state.channel,
    notification: state.notification,
    nowPlaying: state.nowPlaying,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    subscribeToPlaylist: (toggle, channel, timestamp) => { dispatch(subscribeToPlaylist(toggle, channel, timestamp)); },
    removeVideo: (id, channel) => { dispatch(removeVideo(id, channel)); },
    joinChannel: (channel) => { dispatch(joinChannel(channel)); },
    exitChannel: () => { dispatch(exitChannel()); },
    dismissNotification: () => { dispatch(dismissNotification()); },
    addNowPlaying: (video) => { dispatch(addNowPlaying(video)); },
    dismissNowPlaying: () => { dispatch(dismissNowPlaying()); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
