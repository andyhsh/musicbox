import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addVideo, removeVideo } from '../actions/playlist';
import YTsearch from './YTsearch';
import Video from '../components/Video';

import '../styles/menu.css';

class Menu extends Component {

  renderPlaylist() {
    if (this.props.playlist.length !== 0) {
      return this.props.playlist.map((video, index) => {
        return <Video key={index} number={index + 1} track={video.track} videoId={video.videoId} user={video.user} starCount={video.starCount} stars={video.stars} />;
      });
    }
  }

  render() {
    return (
      <div className="menu">
        <div className="menu-container">
          <YTsearch addVideo={this.props.addVideo} channel={this.props.channel} user={this.props.user} />
          <div className="playlist-container">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Track</th>
                  <th>User</th>
                  <th>Upvotes</th>
                </tr>
              </thead>
              <tbody>
                {this.renderPlaylist()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    playlist: state.playlist,
    channel: state.channel,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addVideo: (video, channel, user) => { dispatch(addVideo(video, channel, user)); },
    removeVideo: (id, channel) => { dispatch(removeVideo(id, channel)); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
