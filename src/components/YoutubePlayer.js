import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Youtube from 'react-youtube';

class YoutubePlayer extends Component {

  static onReady(e) {
    // access to player in all event handlers via event.target
    console.log(e);
    // e.target.pauseVideo();
  }

  static onEnd(e) {
    console.log(e);
  }

  render() {
    const opts = {
      height: '700px',
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1, // automatically play video
        controls: 0, // hide controls
        disablekb: 0, // allow keyboard control
        modestbranding: 1, // remove watermark/logo
      },
    };
    // sample videoId = "otYHF8jaLjw"
    return (
      <Youtube
        videoId={this.props.videoId}
        opts={opts}
        onReady={YoutubePlayer.onReady}
        onEnd={YoutubePlayer.onEnd}
      />
    );
  }
}

YoutubePlayer.propTypes = {
  videoId: PropTypes.string.isRequired,
};

export default YoutubePlayer;
