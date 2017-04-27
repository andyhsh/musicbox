import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPlaylist, deletePlaylist } from '../actions/playlist';

const styles = {
  sidebar: {
    width: 400,
    height: '100%',
  },
  sidebarLink: {
    // display: 'block',
    padding: '16px 0px',
    color: '#757575',
    textDecoration: 'none',
  },
  divider: {
    margin: '8px 0',
    height: 1,
    backgroundColor: '#757575',
  },
  content: {
    padding: '16px',
    height: '100%',
    backgroundColor: 'white',
  },
};

class Sidebar2 extends Component {

  render() {
    return (
      <div style={styles.sidebar}>
          <div style={styles.sidebarLink}>Playlist 1</div>
          <div style={styles.divider} />
          <div style={styles.sidebarLink}>Playlist 2</div>
          <div style={styles.divider} />
          <div style={styles.sidebarLink}>Playlist 3</div>
          <div style={styles.divider} />
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
