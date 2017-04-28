import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../styles/channel-header.css';

class ChannelHeader extends Component {

  render() {
    return (
      <header id="channel-header">
        <Link to="/"><span className="exit-channel fa fa-times" /></Link>
        <span className="pointer playlist-menu fa fa-bars" onClick={this.props.setMenuButton} />
      </header>
    );
  }
}

ChannelHeader.propTypes = {
  setMenuButton: PropTypes.func.isRequired,
};

export default ChannelHeader;
