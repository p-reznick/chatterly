import React, { Component } from 'react';

class Comment extends Component {
  render() {
    const body = this.props.body;
    const handle = this.props.handle;
    return (
      <div className="row">
        <span className="comment_handle two columns offset-by-two">{handle}   </span>
        <span className="comment_body six columns">{body}</span>
      </div>
    );
  }
}

export default Comment;
