import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Drawer from 'material-ui/Drawer';
import MenuButton from 'material-ui/svg-icons/navigation/menu';
import YTsearch from './YTsearch';
import Playlist from './Playlist';
import { deletePlaylist } from '../actions/playerlist';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  renderPlaylistContainer() {
    return this.props.playlist.length !== 0 ?
      <Playlist playlist={this.props.playlist} deletePlaylist={this.props.deletePlaylist} /> :
      <p>Please add a song</p>;
  }

  render() {
    const iconStyles = {
    // TODO: style the navigation icon
    };

    return (
      <div>
        <MenuButton
          style={iconStyles}
          onTouchTap={this.handleToggle}
        />
        <Drawer width={400} openSecondary={true} open={this.state.open} >
          <MenuButton
            style={iconStyles}
            onTouchTap={this.handleToggle}
          />
          <YTsearch />
          {this.renderPlaylistContainer()}
        </Drawer>
      </div>
    );
  }
}

Sidebar.propTypes = {
  playlist: PropTypes.array.isRequired,
  deletePlaylist: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    playlist: state.playlist,
  };
};

// TODO:
// map additional actions: Upvote and downvote of video for mobile users
const mapDispatchToProps = (dispatch) => {
  return {
    deletePlaylist: (index) => { dispatch(deletePlaylist(index)); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
