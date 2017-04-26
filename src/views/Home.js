import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ChannelSearch from '../containers/ChannelSearch';
import SignInButton from '../components/SignInButton';
import SignOutButton from '../components/SignOutButton';
import { signIn, signOut } from '../actions/auth';

class Home extends Component {

  renderSigningButton() {
    // if user is not signed in, render sign in buttons
    if (!this.props.user.isUserSignedIn) {
      return (
        <div>
          Login with:
          <SignInButton
            signIn={this.props.signIn}
            socialMedia="google"
          />
          <SignInButton
            signIn={this.props.signIn}
            socialMedia="facebook"
          />
        </div>
      );
    }
    // if user is signed in, render sign out buttons
    return (
      <div>
        <SignOutButton signOut={this.props.signOut} />
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <ChannelSearch />
        {this.renderSigningButton()}
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
