import React, { Component } from 'react';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newHandle: '',
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
      if (res.errorMessage) {
        this.props.handle_error(res.errorMessage);
        return;
      }
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
      if (res.errorMessage) {
        this.props.handle_error(res.errorMessage);
        return;
      }
      const userId = res.id;
      loginUser(userId, handle);
    });
    this.setState({ existingHandle: '' });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <form className="four columns" onSubmit={this.handleHandleCreation}>
            <label htmlFor="newHandle">New here?  Create a handle!</label>
            <input className="" type="text" id="newHandle" placeholder="My new handle" onChange={this.handleNewChange} />
            <input className="button-primary" type="submit" value="Create" />
          </form>
        </div>
        <div className="row">
          <form className="four columns" onSubmit={this.handleLogin}>
            <label htmlFor="login">Already have a handle? Log in!</label>
            <input type="text" id="login" placeholder="My handle" onChange={this.handleExistingChange} />
            <input className="button-primary" type="submit" value="Login" />
          </form>
        </div>
      </div>
    );
  }
}

export default Landing;
