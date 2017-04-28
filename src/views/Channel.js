import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import ChannelHeader from '../containers/ChannelHeader';
import Menu from '../containers/Menu';
import YoutubePlayer from '../components/YoutubePlayer';
import { joinChannel, exitChannel } from '../actions/channel';
import { subscribeToPlaylist, removeVideo } from '../actions/playlist';

import '../styles/channel.css';

class Channel extends Component {
  constructor(props) {
    super(props);
    this.setMenuButton = this.setMenuButton.bind(this);
    this.handleHover = this.handleHover.bind(this);
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
    // container.addEventListener('mousemove', this.handleHover);
  }

  componentWillUnmount() {
    this.props.subscribeToPlaylist(false, this.props.match.params.channel);
    this.props.exitChannel();
    // const container = document.getElementById('channel-container');
    // container.removeEventListener('mousemove', this.handleHover);
  }

  setMenuButton() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  // set state to render ChannelHeader component.
  // set state to unmount after 5 seconds.
  handleHover() {
    this.setState({
      renderMenuButtons: true,
    });
    // Arrow function to bind this to Channel
    setTimeout(() => this.setState({ renderMenuButtons: false }), 3000);
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

  renderMenu() {
    if (this.state.menuOpen) {
      return <Menu setMenuButton={this.setMenuButton} />;
    }
  }

  render() {
    return (
      <div id="channel-container">
        <ChannelHeader setMenuButton={this.setMenuButton} />

        {/* Render Youtubeplayer if playlist exists */}
        <div className="youtube-player-container">
          { this.props.playlist[0] !== undefined ?
            this.renderYoutubePlayer() :
            <p className="empty-playlist">
              Please add a song. This is channel # {this.props.match.params.channel}.
            </p> }
        </div>

        {/* Menu is rendered on toggle button */}
        <CSSTransitionGroup
          transitionName="menu"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={200}>
          {this.renderMenu()}
        </CSSTransitionGroup>
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
