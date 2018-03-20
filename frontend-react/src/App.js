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
      inputBlurred: this.getLocalInputBlurred(),
      roomId: this.getLocalRoomId(),
      roomName: this.getLocalRoomName(),
      userId: this.getLocalUserId(),
      handle: this.getLocalHandle(),
      blurredCommentsCount: this.getLocalBlurredCommentsCount(),
      lastCommentId: 0
    };
    this.loginUser = this.loginUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.enterRoom = this.enterRoom.bind(this);
    this.refreshComments = this.refreshComments.bind(this);
    this.handleError = this.handleError.bind(this);
    this.getLocalUserId = this.getLocalUserId.bind(this);
    this.getLocalHandle = this.getLocalHandle.bind(this);
    this.getLocalRoomId = this.getLocalRoomId.bind(this);
    this.getLocalBlurredCommentsCount = this.getLocalBlurredCommentsCount.bind(this);
    this.getLocalRoomName = this.getLocalRoomName.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.getLocalInputBlurred = this.getLocalInputBlurred.bind(this);
    this.resetLocalStorageAndState = this.resetLocalStorageAndState.bind(this);
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

  getLocalBlurredCommentsCount() {
    return +localStorage.getItem('blurredCommentsCount') || 0;
  }

  getLocalInputBlurred() {
    const localVal = localStorage.getItem('inputBlurred');
    if (localVal === 'false') {
      return false;
    } else {
      return true;
    }
  }

  handleError(errorMessage) {
    this.setState({ errorMessage });
  }

  pollForCommentsAndRooms() {
    const stopPolling = setInterval(() => {
      this.refreshTitle();
      this.refreshComments();
      this.refreshRooms();
    }, 100);
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
    this.resetLocalStorageAndState();
    this.refreshTitle();
  }

  resetLocalStorageAndState() {
    localStorage.setItem('userId', '-1');
    localStorage.setItem('handle', '');
    localStorage.setItem('roomName', '');
    localStorage.setItem('roomId', -1);
    localStorage.setItem('inputBlurred', 'true');
    localStorage.setItem('blurredCommentsCount', 0);
    this.setState({
      userId: -1,
      handle: '',
      roomId: -1,
      roomName: '',
      comments: [],
      inputBlurred: true,
    });
  }

  handleBlur(event) {
    this.setState({
      inputBlurred: true
    });
  }

  handleFocus(event) {
    this.setState({
      inputBlurred: false,
      blurredCommentsCount: 0
    });
  }

  enterRoom(roomName, roomId) {
    localStorage.setItem('roomName', roomName);
    localStorage.setItem('roomId', roomId);
    this.setState({
      roomName,
      roomId,
      errorMessage: undefined
    });
    this.refreshComments();
  }

  refreshComments(event) {
    if (event) event.preventDefault();

    const lastCommentId = this.state.lastCommentId;
    fetch('/rooms/' + this.state.roomId + '/comments/' + lastCommentId).then((res) => {
      return res.json();
    }).then((res) => {
      const newLastCommentId = res[res.length - 1].id;
      let newBlurredCommentsCount = 0;

      if (this.state.inputBlurred === true) {
        newBlurredCommentsCount = this.state.blurredCommentsCount + res.length;
      }

      this.setState({
        blurredCommentsCount: newBlurredCommentsCount,
        lastCommentId: newLastCommentId,
        comments: this.state.comments.concat(res)
      });
      console.log(this.state);
    }).catch((err) => {
      this.setState({ err });
    });
  }

  refreshRooms() {
    fetch('/rooms').then((res) => (
      res.json()
    )).then((res) => {
      this.setState({
        rooms: res
      });
    }).catch((err) => {
      this.setState({ err });
    });
  }

  refreshTitle() {
    if (this.state.blurredCommentsCount > 0) {
      document.title = "Chatterly " + "(" + this.state.blurredCommentsCount + ")";
    } else {
      document.title = "Chatterly";
    }
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
            handle_error={this.handleError}
          />
        </div>
      );
    } else {
      return (
        <div id="room">
          <Room
            handle_blur={this.handleBlur}
            handle_focus={this.handleFocus}
            refresh_comments={this.refreshComments}
            logout_user={this.logoutUser}
            room_id={this.state.roomId}
            comments={this.state.comments}
            user_id={this.state.userId}
            handle={this.state.handle}
            handle_error={this.handleError}
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
    this.pollForCommentsAndRooms();
  }

  componentWillUnmount() {
    if (this.state.stopPolling) {
      this.state.stopPolling();
    }
  }
}

export default App;
