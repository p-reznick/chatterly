import React, { Component } from 'react';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newHandle: 'My new handle',
      existingHandle: ''
    };

    this.handleNewChange = this.handleNewChange.bind(this);
    this.handleExistingChange = this.handleExistingChange.bind(this);
    this.handleNewSubmit = this.handleNewSubmit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleNewChange(event) {
    this.setState({ newHandle: event.target.value });
  }

  handleExistingChange(event) {
    this.setState({ existingHandle: event.target.value });
  }

  handleNewSubmit(event) {
    event.preventDefault();
    const url = 'users/' + this.state.newHandle;
    fetch(url, {
      method: 'POST'
    }).then(() => {
      fetch(url);
    });
    this.setState({ newHandle: '' });
  }

  handleLogin(event) {
    const loginUser = this.props.login_user;
    event.preventDefault();
    const url = 'users/' + this.state.existingHandle;
    fetch(url).then((res) => (
      res.json()
    )).then((res) => {
      const userId = res.user_id.id;
      loginUser(userId, this.state.existingHandle);
    });
    this.setState({ existingHandle: '' });
  }

  render() {
    return (
      <div>
        <h1>Welcome to Chatterly!</h1>
        <h2>Create a new handle</h2>
        <form onSubmit={this.handleNewSubmit}>
          <input type="text" value={this.state.newHandle} onChange={this.handleNewChange} />
          <input type="submit" value="Create" />
        </form>
        <h2>Already have a handle? Login!</h2>
        <form onSubmit={this.handleLogin}>
          <input type="text" value={this.state.existingHandle} onChange={this.handleExistingChange} />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default Landing;
