import React, { Component } from 'react';
import CommentList from './CommentList';
import CommentInput from './CommentInput';
import LogoutButton from './LogoutButton';

class Room extends Component {
  render() {
    const comments = this.props.comments;
    const userId = this.props.user_id;
    const roomId = this.props.room_id;
    return (
      <div>
        <h2>Current Room</h2>
        <p>Welcome,
        <LogoutButton
          logout_user={this.props.logout_user}
        />
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
