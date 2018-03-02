import React, { Component } from 'react';

class Comment extends Component {
  render() {
    const body = this.props.body;
    const handle = this.props.handle;
    return (
      <div className="row">
        <span className="two columns comment_handle">{handle}   </span>
        <span className="comment_body">{body}</span>
      </div>
    );
  }
}

export default Comment;
