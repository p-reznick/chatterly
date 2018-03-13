import React, { Component } from 'react';
import Landing from './Landing';
import Room from './Room';

class App extends Component {
  constructor() {
    super();
    this.state = {
      comments: [],
      roomId: 1,
      userId: this.getLocalUserId(),
      handle: this.getLocalHandle(),
      lastCommentId: 0
    };
    this.loginUser = this.loginUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.refreshComments = this.refreshComments.bind(this);
    this.handleError = this.handleError.bind(this);
    this.getLocalUserId = this.getLocalUserId.bind(this);
    this.getLocalHandle = this.getLocalHandle.bind(this);
    this.pollForComments();
  }

  getLocalUserId() {
    return +localStorage.getItem('userId') || -1;
  }

  getLocalHandle() {
    return localStorage.getItem('handle') || '';
  }

  handleError(errorMessage) {
    this.setState({ errorMessage });
  }

  pollForComments() {
    const stopPolling = setInterval(this.refreshComments, 100);
    this.setState({ stopPolling });
  }

  loginUser(userId, handle) {
    this.setState({
      userId: userId,
      handle: handle,
      errorMessage: undefined
    });
    localStorage.setItem('userId', userId);
    localStorage.setItem('handle', handle);
  }

  logoutUser(event) {
    event.preventDefault();
    localStorage.setItem('userId', '-1');
    localStorage.setItem('handle', '');
    this.setState({
      userId: -1,
      handle: ''
    });
  }

  refreshComments(event) {
    if (event) event.preventDefault();
    const lastCommentId = this.state.lastCommentId;
    fetch('/rooms/1/comments/' + lastCommentId).then((res) => {
      return res.json();
    }).then((res) => {
      const newLastCommentId = res[res.length -1].id;
      this.setState({
        lastCommentId: newLastCommentId,
        comments: this.state.comments.concat(res)
      });
      console.log("Comments refreshed!");
    }).catch((err) => {
      this.setState({ err });
    });
  }

  render() {
    let content;
    if (this.state.userId === -1) {
      content = (
        <div id="landing_page">
          <Landing
            handle_error={this.handleError}
            login_user={this.loginUser}
          />
        </div>
      );
    } else {
      content = (
        <div id="room">
          <Room
            refresh_comments={this.refreshComments}
            logout_user={this.logoutUser}
            room_id={this.state.roomId}
            comments={this.state.comments}
            user_id={this.state.userId}
            handle={this.state.handle}
          />
        </div>
      );
    }
    return (
      <div className="container">
        <div>
          <h1>Chatterly</h1>
        </div>
        <div>
          <p>{this.state.errorMessage}</p>
        </div>
        <div>
          {content}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.refreshComments();
  }

  componentWillUnmount() {
    if (this.state.stopPolling) {
      this.state.stopPolling();
    }
  }
}

export default App;
