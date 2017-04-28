import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NewVideoAddedPopup extends Component {

  render() {
    return (
      <div className="popup-container gradient-animator">
        <h2>New track added:</h2>
        <p>{this.props.track}</p>
        <p>{this.props.user}</p>
      </div>
    );
  }
}

NewVideoAddedPopup.propTypes = {
  track: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};

export default NewVideoAddedPopup;
