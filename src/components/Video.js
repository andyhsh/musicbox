import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Video extends Component {

  render() {
    return (
      <tr>
        <td>{this.props.number}</td>
        <td>{this.props.track}</td>
        <td>{this.props.user}</td>
        <td>{this.props.starCount}</td>
      </tr>
    );
  }
}

Video.propTypes = {
  number: PropTypes.number.isRequired,
  track: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  starCount: PropTypes.number.isRequired,
};

export default Video;
