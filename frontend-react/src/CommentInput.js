import React, { Component } from 'react';

class CommentInput extends Component {
  constructor(props) {
    super(props);
    this.state = { newComment: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ newComment: event.target.value });
  }

  handleSubmit(event) {
    const userId = this.props.user_id;
    const roomId = this.props.room_id;
    event.preventDefault();
    const url = 'rooms/' + roomId + '/users/' + userId + '/comments/' + this.state.newComment;
    alert(url);
    fetch(url, {
      method: 'POST'
    });
    this.setState({ newComment: '' });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          New Comment:
          <input type="text" value={this.state.newComment} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default CommentInput;
