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
      return <td><span className="star-icon pointer fa fa-star" onClick={this.handleStar} /></td>;
    } else if (userStarred) {
      return <td><span className="star-icon pointer fa fa-star-o" onClick={this.handleStar} /></td>;
    }
  }

  handleStar() {
    this.props.starVideo(this.props.id, this.props.channel, this.props.currentUser.uid);
  }

  handleDelete() {
    this.props.removeVideo(this.props.id, this.props.channel);
  }

  render() {
    const userLoggedIn = this.props.currentUser.uid;

    return (
      <tr>
        <td>{this.props.number}</td>
        <td>{this.props.track}</td>
        <td>{this.props.user}</td>
        <td>{this.props.duration}</td>
        <td>
          {this.props.starCount !== 0 ?
          this.props.starCount :
          '-'}
        </td>
        {this.renderStars()}
        { userLoggedIn && <td><span className="trash-icon pointer fa fa-trash-o" onClick={this.handleDelete} /></td> }
      </tr>
    );
  }
}

Video.propTypes = {
  number: PropTypes.number.isRequired,
  track: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  starCount: PropTypes.number.isRequired,
  stars: PropTypes.object.isRequired,
};

export default Video;
