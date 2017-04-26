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
      <form>
        <input type="text" name="channel" onChange={this.handleChange} />
        <button className="btn btn-default" type="submit" onClick={this.handleClick}><Link to={`/${this.state.channel}`}>Create/Join Channel</Link></button>
      </form>
    );
  }
}

export default ChannelSearch;
