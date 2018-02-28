import React, { Component } from 'react';
import CommentList from './CommentList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      comments: []
    };
  }

  render() {
    return (
      <div>
        <h1>Welcome to Chatterly!</h1>
        <CommentList
          comments={this.state.comments}
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
