import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Youtube from 'react-youtube';

import '../styles/channel.css';

class YoutubePlayer extends Component {
  constructor(props) {
    super(props);
    this.onReady = this.onReady.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  onReady() {
    // access to player in all event handlers via event.target
    // e.target.pauseVideo();
    // console.log('playing video: ', this.props.videoId);
  }

  // Once video has finished playing, dispatch action to update playlist by removing the first obj
  onEnd() {
    console.log('finished playing video');
    this.props.nextPlaylist(this.props.videoId);
  }

  render() {
    const opts = {
      height: '100%',
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1, // automatically play video
        controls: 1, // hide controls
        disablekb: 0, // allow keyboard control
        modestbranding: 1, // remove watermark/logo
        iv_load_policy: 3, // disable anotations
        showinfo: 0, // remove default video title information
        color: 'white',
      },
    };
    // sample videoId = "otYHF8jaLjw"
    return (
      <Youtube
        className="youtube-player"
        videoId={this.props.videoId}
        opts={opts}
        onReady={this.onReady}
        onEnd={this.onEnd}
      />
    );
  }
}

YoutubePlayer.propTypes = {
  videoId: PropTypes.string.isRequired,
  nextPlaylist: PropTypes.func.isRequired,
};

export default YoutubePlayer;
