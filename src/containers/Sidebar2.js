import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPlaylist, deletePlaylist } from '../actions/playlist';

class Sidebar2 extends Component {

  render() {
    return (
      <div className="container-fluid">
        Hello from Sidebar!
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
