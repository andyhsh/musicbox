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
    this.state = {
      menuOpen: false,
    };
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

  setMenuButton() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  // Render Youtubeplayer player after checking if any playlist added
  renderYoutubePlayer() {
    const { videoId, id } = this.props.playlist[0];

    return (
      <YoutubePlayer
        id={id}
        videoId={videoId}
        removeVideo={this.props.removeVideo}
        channel={this.props.match.params.channel}
      />
    );
  }

  renderMenu() {
    if (this.state.menuOpen) {
      return <Menu setMenuButton={this.setMenuButton} />
    }
  }

  render() {
    return (
      <div>
        <ChannelHeader setMenuButton={this.setMenuButton} />

        {/* Render Youtubeplayer if playlist exists */}
        <div className="youtube-player-container">
          { this.props.playlist.length !== 0 ?
            this.renderYoutubePlayer() :
            <p className="empty-playlist">
              Please add a song. This is channel # {this.props.match.params.channel}.
            </p> }
        </div>

        {/* Menu is rendered on toggle button */}
        <CSSTransitionGroup
          transitionName="menu"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
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
