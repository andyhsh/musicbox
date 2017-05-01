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
        </MediaQuery>
      </header>
    );
  }
}

ChannelHeader.propTypes = {
  setMenuButton: PropTypes.func.isRequired,
};

export default ChannelHeader;
