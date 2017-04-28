import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/signin-button.css';

class SignInButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
      console.log('logging in via: ', this.props.socialMedia);
      this.props.signIn(this.props.socialMedia);
  }

  render() {
    return (
      <div className="circle">
        <span onClick={this.handleClick} className={`pointer fa fa-${this.props.socialMedia}`} />
      </div>
    );
  }
}

SignInButton.propTypes = {
  signIn: PropTypes.func.isRequired,
  socialMedia: PropTypes.string.isRequired,
};

export default SignInButton;
