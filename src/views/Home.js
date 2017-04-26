import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ChannelSearch from '../containers/ChannelSearch';
import SignInButton from '../components/SignInButton';
import { signIn, signOut } from '../actions/auth';

class Home extends Component {

  renderSignInButton() {
    // if user is not signed in, render sign in buttons
    if (!this.props.user.isUserSignedIn) {
      return (
        <div>
          Login with:
          <SignInButton signIn={this.props.signIn} socialMedia="google" isUserSignedIn={this.props.user.isUserSignedIn} />
          <SignInButton signIn={this.props.signIn} socialMedia="facebook" isUserSignedIn={this.props.user.isUserSignedIn} />
        </div>
      );
    }
    // if user is signed in, render sign out buttons
    return (
      <div>
        <SignInButton signOut={this.props.signOut} isUserSignedIn={this.props.user.isUserSignedIn} />
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <ChannelSearch />
        {this.renderSignInButton()}
      </div>
    );
  }
}

Home.propTypes = {
  signIn: PropTypes.func,
  signOut: PropTypes.func,
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
