import React, { Component } from 'react';

class Comment extends Component {
  render() {
    const body = this.props.body;
    const handle = this.props.handle;
    return (
      <div>
        <span className="commentHandle">{handle}</span>
        <span className="commentBody">{body}</span>
      </div>
    );
  }
}

export default Comment;
