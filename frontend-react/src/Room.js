import React, { Component } from 'react';
import CommentList from './CommentList';

class Room extends Component {
  render() {
    const comments = this.props.comments;
    return (
      <CommentList
        comments={comments}
      />
    );
  }
}

export default Room;
