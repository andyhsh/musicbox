import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import YoutubePlayer from '../components/YoutubePlayer';

class PlayerManager extends Component {

  renderYoutubePlayer() {
    const currentVideoId = this.props.playlist[0].videoId;
    return <YoutubePlayer videoId={currentVideoId} />;
  }

  render() {
    return (
      <div>
        { this.props.playlist.length > 0 ? this.renderYoutubePlayer() : null }
      </div>
    );
  }
}

PlayerManager.propTypes = {
  playlist: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    playlist: state.playlist.playList,
  };
};

export default connect(mapStateToProps)(PlayerManager);
