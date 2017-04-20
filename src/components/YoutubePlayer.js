import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Youtube from 'react-youtube';

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

  onEnd(event) {
    console.log('finished playing video');
    this.props.nextPlaylist();
    // this.props.nextPlaylist(); not passing in through props...undefined
  }

  render() {
    const opts = {
      height: '700px',
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1, // automatically play video
        controls: 1, // hide controls
        disablekb: 0, // allow keyboard control
        modestbranding: 1, // remove watermark/logo
        iv_load_policy: 3, // disable anotations
      },
    };
    // sample videoId = "otYHF8jaLjw"
    return (
      <Youtube
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
