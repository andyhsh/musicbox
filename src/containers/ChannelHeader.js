import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ChannelHeader extends Component {

  render() {
    return (
      <header className="navbar navbar-default navbar-static-top" id="channel-header">
        <nav className="container">
          <div className="navbar-header">
            <Link to="/"><span className="navbar-brand glyphicon glyphicon-menu-left" /></Link>
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
