import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChannelHeader from '../containers/ChannelHeader';
//import Sidebar2 from '../containers/Sidebar2';

class Channel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ChannelHeader />
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
