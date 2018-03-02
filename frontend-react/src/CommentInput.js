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
    fetch(url, {
      method: 'POST'
    });
    this.setState({ newComment: '' });
  }

  render() {
    return (
      <div className="row">
        <form onSubmit={this.handleSubmit}>
          <input className="five columns" type="text" id="commentInput" value={this.state.newComment} onChange={this.handleChange} />
          <input className="two columns" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default CommentInput;
