import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NowPlaying extends Component {

  componentDidMount() {
  // start timer function
    this.startTimer();
  }

  startTimer() {
  // dispatch an action to set notification to false after certain period of time
    this.timerId = setTimeout(() => {
      this.props.dismissNowPlaying();
    }, 5000);
  }

  render() {
    return (
      <div className="nowPlaying-container gradient-animator">
        <h2>{this.props.track}</h2>
      </div>
    );
  }
}

NowPlaying.propTypes = {
  track: PropTypes.string.isRequired,
  dismissNowPlaying: PropTypes.func.isRequired,
};

export default NowPlaying;
