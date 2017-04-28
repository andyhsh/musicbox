import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ChannelSearch extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      channel: '',
    };
  }

  handleChange(e) {
    this.setState({
      channel: e.target.value
    });
  }

  handleClick(e) {
    e.preventDefault();
    console.log('click');
  }

  render() {
    return (
      <div id="channel-search-container">
        <input id="channel-search-input" placeholder="Join a channel" type="text" onChange={this.handleChange} />
        <span className="channel-search-icon fa fa-search" />
      </div>
    );
  }
}
/*
        <button className="btn btn-default" type="submit" onClick={this.handleClick}><Link to={`/${this.state.channel}`}>Create/Join Channel</Link></button>
*/

export default ChannelSearch;
