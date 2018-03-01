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
        {comments}
      </div>
    );
  }
}

export default CommentList;
