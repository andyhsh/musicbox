import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';

import '../styles/channel-header.css';

class ChannelHeader extends Component {

  render() {
    return (
      <header id="channel-header">
        <Link to="/"><span className="exit-channel fa fa-times" /></Link>
        {/* Only master device (iPad and above) need to have menu toggle */}
        <MediaQuery minDeviceWidth={768}>
          <span className="pointer playlist-menu fa fa-bars" onClick={this.props.setMenuButton} />
          <span className="next-song pointer fa fa-step-forward" onClick={this.props.nextPlaylist} />
        </MediaQuery>
      </header>
    );
  }
}

ChannelHeader.propTypes = {
  setMenuButton: PropTypes.func.isRequired,
  nextPlaylist: PropTypes.func,
};

export default ChannelHeader;
