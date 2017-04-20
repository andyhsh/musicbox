import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
// import IconButton from 'material-ui/IconButton';
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
// import IconMenu from 'material-ui/IconMenu';
// import MenuItem from 'material-ui/MenuItem';

class Queue extends Component {
  render() {
    return (
      <ListItem
        leftAvatar={<Avatar src={this.props.thumb} size={50} style={{ borderRadius: 0 }} />}
        primaryText={this.props.title}
        secondaryText="Anonymous"
      />
    );
  }
}

Queue.propTypes = {
  title: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
};

export default Queue;
