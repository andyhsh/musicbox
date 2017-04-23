import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import CancelButton from 'material-ui/svg-icons/navigation/cancel';
import IconButton from 'material-ui/IconButton';
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
// import IconMenu from 'material-ui/IconMenu';
// import MenuItem from 'material-ui/MenuItem';

class Queue extends Component {

  // Delete target video from playlist
  handleDelete = () => {
    this.props.deletePlaylist(this.props.videoId);
  }

  render() {
    const deleteButton = (
      <IconButton onClick={this.handleDelete}>
        <CancelButton />
      </IconButton>
    );
    // TODO: wrap element with new className if its the playing video, highlighting the box
    return (
      <ListItem
        leftAvatar={<Avatar src={this.props.thumb} size={50} style={{ borderRadius: 0 }} />}
        primaryText={(this.props.id === 0 ? `Now playing: ${this.props.title}` : this.props.title)}
        secondaryText="Anonymous"
        rightIconButton={deleteButton}
      />
    );
  }
}

Queue.propTypes = {
  title: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  videoId: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  deletePlaylist: PropTypes.func.isRequired,
};

export default Queue;
