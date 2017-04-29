import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Video extends Component {
  constructor(props) {
    super(props);
    this.handleStar = this.handleStar.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  renderStars() {
    const userStarred = this.props.currentUser.uid;
    if (this.props.stars.hasOwnProperty(userStarred)) {
      return <span className="pointer fa fa-star" onClick={this.handleStar} />;
    } else if (userStarred) {
      return <span className="pointer fa fa-star-o" onClick={this.handleStar} />;
    }
  }

  // TODO: TO CHECK IF USER IS MASTER FIRST. SLAVE UNITS SHOULD NOT BE GIVEN DELETE FUNCTION.
  renderDelete() {
    const userLoggedIn = this.props.currentUser.uid;
    if (userLoggedIn) {
      return <span className="pointer fa fa-trash-o" onClick={this.handleDelete} />
    }
  }

  handleStar() {
    this.props.starVideo(this.props.id, this.props.channel, this.props.currentUser.uid);
  }

  handleDelete() {
    this.props.removeVideo(this.props.id, this.props.channel);
  }

  render() {
    return (
      <tr>
        <td>{this.props.number}</td>
        <td>{this.props.number === 1 ?
              <span className="now-playing">Now Playing: {this.props.track}</span> :
              this.props.track}
        </td>
        <td>{this.props.user}</td>
        <td>{this.props.duration}</td>
        <td>{this.props.starCount !== 0 ?
              this.props.starCount :
              '-'}
        </td>
        <td>{this.renderStars()}</td>
        <td>{this.renderDelete()}</td>
      </tr>
    );
  }
}

Video.propTypes = {
  number: PropTypes.number.isRequired,
  track: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  starCount: PropTypes.number.isRequired,
  stars: PropTypes.object.isRequired,
};

export default Video;
