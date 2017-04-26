import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SignOutButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('sign out!');
    this.props.signOut();
  }

  render() {
    return (
      <button onClick={this.handleClick}>Log out</button>
    );
  }
}

SignOutButton.propTypes = {
  signOut: PropTypes.func.isRequired,
};

export default SignOutButton;
