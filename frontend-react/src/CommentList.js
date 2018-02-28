import React, { Component } from 'react';
import Comment from './Comment';

class CommentList extends Component {
  render() {
    const comments = this.props.comments.map((comment) => (
      <Comment
        key={'comment-' + comment.id}
        handle={comment.handle}
        body={comment.body}
      />
    ));

    return (
      <div>
        <h3>Current Comments</h3>
        {comments}
      </div>
    );
  }
}

export default CommentList;
