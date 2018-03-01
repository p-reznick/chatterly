import React, { Component } from 'react';
import Room from './Room'

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
        <h1>Welcome to Chatterly!</h1>
        <Room
          room_id={this.state.roomId}
          comments={this.state.comments}
          user_id={this.state.userId}
        />
      </div>
    );
  }
  componentDidMount() {
    fetch('/comments').then((res) => {
      return res.json();
    }).then((res) => {
      this.setState({ comments: res });
    }).catch((err) => {
      this.setState({ err });
    });
  }
}

export default App;
