import React, { Component } from 'react';
import Youtube from 'react-youtube';

class Player extends Component {

  static onReady(e) {
    // access to player in all event handlers via event.target
    console.log(e);
    // e.target.pauseVideo();
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

    return (
      <Youtube
        videoId="otYHF8jaLjw"
        opts={opts}
        onReady={Player.onReady}
      />
    );
  }
}

export default Player;
