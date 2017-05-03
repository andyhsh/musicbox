import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NowPlaying extends Component {

  componentDidMount() {
  // start timer function
    this.startTimer();
  }

  componentWillUnmount() {
    this.resetTimer();
  }

  resetTimer() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }

  startTimer() {
  // dispatch an action to set notification to false after certain period of time
    this.resetTimer();
    this.timerId = setTimeout(() => {
      this.props.dismissNowPlaying();
    }, 5000);
  }

  render() {
    let artist = 'Now Playing';
    let trackName = this.props.track;
    // if track name contains -, split to artist and trackName components
    if (trackName.includes('-')) {
      const track = trackName.split('-');
      artist = track[0].trim();
      trackName = track[1].trim();
    }

    return (
      <div className="nowplaying-container gradient-animator">
        <div className="nowplaying">
          <h1>{artist}</h1>
          <h2>{trackName}</h2>
        </div>
      </div>
    );
  }
}

NowPlaying.propTypes = {
  track: PropTypes.string.isRequired,
  dismissNowPlaying: PropTypes.func.isRequired,
};

export default NowPlaying;
