import React, { Component } from 'react';

class Comment extends Component {
  render() {
    const body = this.props.body;
    const handle = this.props.handle;
    return (
      <div>
        <span>{handle}:   </span>
        <span>{body}</span>
      </div>
    );
  }
}

export default Comment;
