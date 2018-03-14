import React, { Component } from 'react';
import Landing from './Landing';
import Room from './Room';
import RoomSelector from './RoomSelector';

class App extends Component {
  constructor() {
    super();
    this.state = {
      comments: [],
      rooms: [],
      roomId: -1,
      roomName: '',
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
    this.getLocalRoomId = this.getLocalRoomId.bind(this);
    this.getLocalRoomName = this.getLocalRoomName.bind(this);
    this.pollForComments();
  }

  getLocalUserId() {
    return +localStorage.getItem('userId') || -1;
  }

  getLocalHandle() {
    return localStorage.getItem('handle') || '';
  }

  getLocalRoomId() {
    return +localStorage.getItem('roomId') || -1;
  }

  getLocalRoomName() {
    return localStorage.getItem('roomName') || '';
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
      handle: '',
      roomId: -1,
      roomName: ''
    });
  }

  enterRoom(roomName) {
    console.log(roomName);
    fetch('/rooms/' + this.state.name).then((res) => {
      const roomId = res.id;
      localStorage.setItem('roomName', roomName);
      localStorage.setItem('roomId', roomId);
      this.setState({
        roomName,
        roomId,
      });
    });
  }

  refreshComments(event) {
    if (event) event.preventDefault();
    const lastCommentId = this.state.lastCommentId;
    fetch('/rooms/' + this.state.roomId + '/comments/' + lastCommentId).then((res) => {
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

  generateContent() {
    if (this.state.userId === -1) {
      return (
        <div id="landing_page">
          <Landing
            handle_error={this.handleError}
            login_user={this.loginUser}
          />
        </div>
      );
    } else if (this.state.roomId === -1) {
      return (
        <div id="room_selector">
          <RoomSelector
            rooms={this.state.rooms}
            enter_room={this.enterRoom}
          />
        </div>
      );
    } else {
      return (
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
  }

  render() {
    const content = this.generateContent();
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
