import React, { Component } from 'react';
import CommentList from './CommentList';
import CommentInput from './CommentInput';
import LogoutButton from './LogoutButton';

class Room extends Component {
  scrollToBottom() {
    window.scrollTo(0,document.querySelector("#room").scrollHeight);
  }

  commentsContent(comments) {
    if (comments.length === 0) {
      return (
        <p>Looks like there's nothing here...</p>
      )
    } else {
      return (<CommentList
        comments={comments}
      />)
    }
  }

  render() {
    const comments = this.props.comments;
    const logoutUser = this.props.logout_user;
    const userId = this.props.user_id;
    const roomId = this.props.room_id;
    const handle = this.props.handle;
    const refreshComments = this.props.refresh_comments;
    return (
      <div>
        {this.commentsContent(comments)}
        <CommentInput
          user_id={userId}
          room_id={roomId}
          refresh_comments={refreshComments}
        />
        <LogoutButton
          handle={handle}
          logout_user={logoutUser}
        />
      </div>
    );
  }

  componentDidMount() {
    this.scrollToBottom();
  }
}

export default Room;
