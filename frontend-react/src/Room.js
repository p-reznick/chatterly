import React, { Component } from 'react';
import CommentList from './CommentList';
import CommentInput from './CommentInput';
import LogoutButton from './LogoutButton';
import RefreshButton from './RefreshButton';

class Room extends Component {
  render() {
    const comments = this.props.comments;
    const logoutUser = this.props.logout_user;
    const userId = this.props.user_id;
    const roomId = this.props.room_id;
    const handle = this.props.handle;
    const refreshComments = this.props.refresh_comments;
    return (
      <div>
        <h2>Current Room</h2>
        <p>Logged in as {handle}</p>
        <LogoutButton
          logout_user={logoutUser}
        />
        <RefreshButton
          refresh_comments={refreshComments}
        />
        <CommentList
          comments={comments}
        />
        <CommentInput
          user_id={userId}
          room_id={roomId}
          refresh_comments={refreshComments}
        />
      </div>
    );
  }
}

export default Room;
