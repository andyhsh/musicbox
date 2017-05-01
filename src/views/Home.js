import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ChannelSearch from '../containers/ChannelSearch';
import SignInButton from '../components/SignInButton';
import SignOutButton from '../components/SignOutButton';
import { signIn, signOut } from '../actions/auth';

import '../styles/home.css';

class Home extends Component {

  renderSigningButton() {
    // if user is not signed in, render sign in buttons
    if (!this.props.user.isUserSignedIn) {
      return (
        <div id="login-container">
          {this.props.user.hasError ?
            <p className="flash">{this.props.user.errorMessage}</p> :
            <p>Login with:</p>}
          <p>
          <SignInButton
            signIn={this.props.signIn}
            socialMedia="google-plus"
          />
          <SignInButton
            signIn={this.props.signIn}
            socialMedia="facebook"
          />
          <SignInButton
            signIn={this.props.signIn}
            socialMedia="twitter"
          />
          </p>
        </div>
      );
    }
    // if user is signed in, render sign out buttons
    return (
      <div className="signout-container">
        <SignOutButton signOut={this.props.signOut} />
      </div>
    );
  }

  render() {
    return (
      <div className="home-container gradient-animator">
        <div className="home">
          <h1 className="title">MusicBox</h1>
          <p>Collobarative playlist.</p>
          <p>Join a box to get started.</p>
          <ChannelSearch />
          {this.renderSigningButton()}
        </div>
        <div className="home-footer">
          Created by Andy Ho for General Assembly
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (socialMedia) => { dispatch(signIn(socialMedia)); },
    signOut: () => { dispatch(signOut()); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
