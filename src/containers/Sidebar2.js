import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { addPlaylist, deletePlaylist } from '../actions/playlist';
import YTsearch from './YTsearch';
import Playlist from './Playlist';

import '../styles/sidebar.css';

class Sidebar2 extends Component {

  renderPlaylistContainer() {
    return this.props.playlist.length !== 0 ?
      <Playlist playlist={this.props.playlist} deletePlaylist={this.props.deletePlaylist} /> :
      <p>Please add a song</p>;
  }

  render() {
    return (
      <div className="menu">
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
        {this.renderPlaylistContainer()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    playlist: state.playlist,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPlaylist: (video) => { dispatch(addPlaylist(video)); },
    deletePlaylist: (index) => { dispatch(deletePlaylist(index)); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar2);
