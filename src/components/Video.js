import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';

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

  handleStar(e) {
    e.preventDefault();
    this.props.starVideo(this.props.id, this.props.channel, this.props.currentUser.uid);
  }

  handleDelete() {
    this.props.removeVideo(this.props.id, this.props.channel);
  }

  render() {
    const userLoggedIn = this.props.currentUser.uid;

    return (
      <tr>
        <td>{this.props.number === 1 ? <span className="fa fa-play" /> : this.props.number}</td>
        <td>{this.props.track}</td>

        {/* most mobile devices in landscape mode to see user visible */}
        <MediaQuery minDeviceWidth={415}>
          <td>{this.props.user}</td>
        </MediaQuery>

        <td>{this.props.duration}</td>
        <td>
          {this.props.starCount !== 0 ?
          this.props.starCount :
          '-'}
        </td>
        {this.renderStars()}

        {/* Device must be iPad or above (master) to have delete fuctionality */}
        <MediaQuery minDeviceWidth={768}>
          { userLoggedIn &&
            <td><span className="trash-icon pointer fa fa-trash-o" onClick={this.handleDelete} /></td> }
        </MediaQuery>
      </tr>
    );
  }
}

Video.propTypes = {
  id: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  track: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  starCount: PropTypes.number.isRequired,
  stars: PropTypes.object.isRequired,
  starVideo: PropTypes.func,
  removeVideo: PropTypes.func,
};

export default Video;
