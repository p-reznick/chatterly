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
    this.handleHandleCreation = this.handleHandleCreation.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleNewChange(event) {
    this.setState({ newHandle: event.target.value });
  }

  handleExistingChange(event) {
    this.setState({ existingHandle: event.target.value });
  }

  handleHandleCreation(event) {
    event.preventDefault();
    const loginUser = this.props.login_user;
    const url = 'users/' + this.state.newHandle;
    fetch(url, {
      method: 'POST'
    }).then((res) => (
      res.json()
    )).then((res) => {
      const newId = res.id;
      const newHandle = res.handle;
      loginUser(newId, newHandle);
    });
    this.setState({ newHandle: '' });
  }

  handleLogin(event) {
    event.preventDefault();
    const loginUser = this.props.login_user;
    const handle = this.state.existingHandle;
    const url = 'users/' + handle;
    fetch(url).then((res) => (
      res.json()
    )).then((res) => {
      const userId = res.id;
      loginUser(userId, handle);
    });
    this.setState({ existingHandle: '' });
  }

  render() {
    return (
      <div>
        <h1>Welcome to Chatterly!</h1>
        <h2>Create a new handle</h2>
        <form onSubmit={this.handleHandleCreation}>
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
