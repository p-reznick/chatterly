import React, { Component } from 'react';
import CommentList from './CommentList';
import CommentInput from './CommentInput';

class Room extends Component {
  render() {
    const comments = this.props.comments;
    const userId = this.props.user_id;
    const roomId = this.props.room_id;
    return (
      <div>
        <h2>Current Room</h2>
        <CommentList
          comments={comments}
        />
        <CommentInput
          user_id={userId}
          room_id={roomId}
        />
      </div>
    );
  }
}

export default Room;
