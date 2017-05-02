import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NewVideoNotification extends Component {

  componentDidMount() {
  // start a timer function
  }

  componentWillReceiveProps() {
  // reset timer function
  }

  componentWillUnmount() {

  }

  clearTimer() {
  // clear timeout
  }

  startTimer() {
  // dispatch an action to set notification to false after certain period of time
  }

  render() {
    return (
      <div className="notification-container gradient-animator">
        <div className="notification">
          <p><span className="fa fa-music" /> New track added:</p>
          <h2 className="notification-track">{this.props.track}</h2>
          <h3 className="notification-user">{this.props.user}</h3>
        </div>
      </div>
    );
  }
}

NewVideoNotification.propTypes = {
  track: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};

export default NewVideoNotification;
