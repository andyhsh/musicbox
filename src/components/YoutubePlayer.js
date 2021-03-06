import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Youtube from 'react-youtube';

import '../styles/channel.css';

class YoutubePlayer extends Component {
  constructor(props) {
    super(props);
    this.onPlay = this.onPlay.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  onPlay() {
    console.log('playing video: ', this.props.track);
    this.props.addNowPlaying(this.props.track);
  }

  // Once video has finished playing, dispatch action to update playlist by removing the first obj
  onEnd() {
    console.log('finished playing video');
    this.props.removeVideo(this.props.id, this.props.channel);
  }

  render() {
    const opts = {
      height: '100%',
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1, // automatically play video
        controls: 0, // hide controls
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
        onPlay={this.onPlay}
        onEnd={this.onEnd}
      />
    );
  }
}

YoutubePlayer.propTypes = {
  id: PropTypes.string.isRequired,
  removeVideo: PropTypes.func.isRequired,
  channel: PropTypes.string.isRequired,
  videoId: PropTypes.string.isRequired,
  addNowPlaying: PropTypes.func.isRequired,
};

export default YoutubePlayer;
