import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/signin-button.css';

class SignInButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (!this.props.isUserSignedIn) {
      this.props.signIn();
    } else {
      this.props.signOut();
    }
  }

  render() {
    return (
      <a className={`btn btn-social-icon btn-${this.props.socialMedia}`}>
        <span className={`fa fa-${this.props.socialMedia}`} />
      </a>
    );
  }
}

SignInButton.propTypes = {
  signIn: PropTypes.func,
  signOut: PropTypes.func,
  socialMedia: PropTypes.string.isRequired,
  isUserSignedIn: PropTypes.bool.isRequired,
};

export default SignInButton;
