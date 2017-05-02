import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SignOutButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.signOut();
  }

  render() {
    return (
      <div className="signout-button pointer" onClick={this.handleClick}>
        <span className="fa fa-sign-out" />Logout
      </div>
    );
  }
}

SignOutButton.propTypes = {
  signOut: PropTypes.func.isRequired,
};

export default SignOutButton;
