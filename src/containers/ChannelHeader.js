import React, { Component } from 'react';

class ChannelHeader extends Component {

  render() {
    return (
      <header className="navbar navbar-default navbar-static-top" id="channel-header">
        <nav className="container">
          <div className="navbar-header">
            <a className="navbar-brand"><span className="glyphicon glyphicon-menu-left" /></a>
            <a className="navbar-brand" href="#">MusicBox</a>
          </div>
          <div className="nav">
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#"><span className="glyphicon glyphicon-list" /></a></li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default ChannelHeader;
