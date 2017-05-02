import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class ChannelSearch extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      channel: '',
      redirect: false,
    };
  }

  handleChange(e) {
    this.setState({
      channel: e.target.value.toLowerCase(),
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      redirect: true,
    });
  }

  render() {
    return (
      <div id="channel-search-container">
        <form onSubmit={this.handleSubmit}>
          <input id="channel-search-input" placeholder="Search / Join a box" type="text" onChange={this.handleChange} />
        </form>
        {this.state.redirect && <Redirect to={`/${this.state.channel}`} />}
      </div>
    );
  }
}

export default ChannelSearch;
