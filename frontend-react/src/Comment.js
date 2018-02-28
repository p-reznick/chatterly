import React, { Component } from 'react';

class Comment extends Component {
  render() {
    const body = this.props.body;
    const handle = this.props.handle;
    return (
      <div class="comment">
        <span class="handle">{handle}</span>
        <span class="body">{body}</span>
      </div>
    );
  }
}

export default Comment;
