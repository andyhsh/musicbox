import React, { Component } from 'react';

class Queue extends Component {
  render() {
    return (
      <div>
        <img src={`${this.props.thumb}`} />
        <p>{this.props.title}</p>
      </div>
    );
  }
}

export default Queue;
