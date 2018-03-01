import React, { Component } from 'react';
import Landing from './Landing';
import Room from './Room';

class App extends Component {
  constructor() {
    super();
    this.state = {
      comments: [],
      roomId: 1,
      userId: -1,
      handle: ''
    };
    this.loginUser = this.loginUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }

  loginUser(userId, handle) {
    this.setState({
      userId: userId,
      handle: handle
    });
  }

  logoutUser(event) {
    event.preventDefault();
    this.setState({
      userId: -1,
      handle: ''
    });
  }

  render() {
    let content;
    if (this.state.userId === -1) {
      content = (
        <div id="landing_page">
          <Landing
            login_user={this.loginUser}
          />
        </div>
      );
    } else {
      content = (
        <div id="chatroom">
          <Room
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
      <div>
        {content}
      </div>
    );
  }
  componentDidMount() {
    fetch('/rooms/1/comments').then((res) => {
      return res.json();
    }).then((res) => {
      this.setState({ comments: res });
    }).catch((err) => {
      this.setState({ err });
    });
  }
}

export default App;
