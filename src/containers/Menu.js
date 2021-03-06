import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import { addVideo, removeVideo, starVideo } from '../actions/playlist';
import YTsearch from './YTsearch';
import Video from '../components/Video';
import '../styles/menu.css';
import '../styles/playlist.css';

class Menu extends Component {

  renderPlaylist() {
    if (this.props.playlist[0] !== undefined) {
      return this.props.playlist.map((video, index) => {
        return (
          <Video key={index} number={index + 1} timestamp={video.timestamp} id={video.id} track={video.track} videoId={video.videoId} duration={video.duration} user={video.user} starCount={video.starCount} stars={video.stars} currentUser={this.props.user} channel={this.props.channel} starVideo={this.props.starVideo}
          removeVideo={this.props.removeVideo} />

        );
      });
    }
  }

  render() {
    const userLoggedIn = this.props.user.uid;

    return (
      <div className="menu gradient-animator">
        <div className="menu-container">
          <YTsearch
            addVideo={this.props.addVideo}
            channel={this.props.channel}
            user={this.props.user}
          />
          <div className="playlist-container">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Track</th>
                  {/* most mobile devices in landscape mode to see user visible */}
                  <MediaQuery orientation="landscape">
                    <th><span className="fa fa-user-o" /></th>
                  </MediaQuery>

                  <th><span className="fa fa-clock-o" /></th>
                  <th><span className="fa fa-signal" /></th>
                  {/* If user is logged in, generate columns for stars and delete */}
                  { userLoggedIn && <th /> }

                  {/* Device must be iPad or above (master) to have delete fuctionality */}
                  <MediaQuery minDeviceWidth={768}>
                    { userLoggedIn && <th /> }
                  </MediaQuery>
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

Menu.propTypes = {
  playlist: PropTypes.array.isRequired,
  channel: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  addVideo: PropTypes.func.isRequired,
  starVideo: PropTypes.func.isRequired,
  removeVideo: PropTypes.func.isRequired,
};

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
    starVideo: (id, channel, userId) => { dispatch(starVideo(id, channel, userId)); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
