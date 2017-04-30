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
      channel: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      redirect: true,
    });
  }

  handleRedirect() {
    if (this.state.redirect) return <Redirect to={`/${this.state.channel}`} />;
  }

  render() {
    return (
      <div id="channel-search-container">
        <form onSubmit={this.handleSubmit}>
          <input id="channel-search-input" placeholder="Search / Join a box" type="text" onChange={this.handleChange} />
        </form>
        {this.handleRedirect()}
      </div>
    );
  }
}
/*
        <button className="btn btn-default" type="submit" onClick={this.handleClick}><Link to={`/${this.state.channel}`}>Create/Join Channel</Link></button>
*/

export default ChannelSearch;
