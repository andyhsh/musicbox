import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Video extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  renderStars() {
    const userStarred = this.props.currentUser.uid;
    if (this.props.stars.hasOwnProperty(userStarred)) {
      return <span className="glyphicon glyphicon-star" onClick={this.handleClick} />;
    } else if (userStarred) {
      return <span className="glyphicon glyphicon-star-empty" onClick={this.handleClick} />;
    }
  }

  handleClick() {
    debugger;
    this.props.starVideo(this.props.id, this.props.channel, this.props.currentUser.uid);
  }

  render() {
    return (
      <tr>
        <td>{this.props.number}</td>
        <td>{this.props.track}</td>
        <td>{this.props.user}</td>
        <td>{(this.props.starCount !== 0) ? this.props.starCount : '-'}</td>
        <td>{this.renderStars()}</td>
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
