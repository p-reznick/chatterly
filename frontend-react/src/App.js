import React, { Component } from 'react';
import Landing from './Landing';
import Room from './Room';

class App extends Component {
  constructor() {
    super();
    this.state = {
      comments: [],
      roomId: 1,
      userId: 1
    };
  }

  render() {
    return (
      <div>
        <div id="landing_page">
          <Landing />
        </div>
        <div id="chatroom">
          <Room
            room_id={this.state.roomId}
            comments={this.state.comments}
            user_id={this.state.userId}
          />
        </div>
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
