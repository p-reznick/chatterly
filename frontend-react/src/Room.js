import React, { Component } from 'react';
import CommentList from './CommentList';

class Room extends Component {
  render() {
    const comments = this.props.comments;
    return (
      <div>
        <h2>Current Room</h2>
        <CommentList
          comments={comments}
        />
      </div>
    );
  }
}

export default Room;
