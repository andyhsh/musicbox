import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NewVideoNotification extends Component {

  componentDidMount() {
  // start timer function
    this.startTimer();
  }

  componentWillReceiveProps(nextProps) {
  // reset timer function upon update on props
    if (nextProps.track) {
      this.startTimer();
    }
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
      this.props.dismissNotification();
    }, 4000);
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
  dismissNotification: PropTypes.func.isRequired,
};

export default NewVideoNotification;
