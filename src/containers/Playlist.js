import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List } from 'material-ui/List';
import { deletePlaylist } from '../actions/playerlist';
// import IconButton from 'material-ui/IconButton';
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
// import IconMenu from 'material-ui/IconMenu';
// import MenuItem from 'material-ui/MenuItem';

import Queue from '../components/Queue';

class Playlist extends Component {
  renderPlaylist() {
    return this.props.playlist.map((video, index) => {
      // TODO: add username property
      return (
        <Queue
          key={index}
          videoId={video.videoId}
          title={video.title}
          thumb={video.thumb}
          deletePlaylist={this.props.deletePlaylist}
        />
      );
    });
  }

  render() {
    return (
      <List>
        {this.renderPlaylist()}
      </List>
    );
  }
}

Playlist.propTypes = {
  playlist: PropTypes.array.isRequired,
  deletePlaylist: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    playlist: state.playlist.playList,
  };
};

// TODO:
// map additional actions: Upvote and downvote of video for mobile users
const mapDispatchToProps = (dispatch) => {
  return {
    deletePlaylist: (index) => { dispatch(deletePlaylist(index)); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
