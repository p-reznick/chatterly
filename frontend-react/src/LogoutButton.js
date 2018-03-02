import React, { Component } from 'react';

class LogoutButton extends Component {
  render() {
    const handle = this.props.handle;
    const message = "Logged in as " + handle + ": Logout";
    return (
      <form onSubmit={this.props.logout_user}>
        <input className="button logout_button seven columns" type="submit" value={message} />
      </form>
    )
  }
}

export default LogoutButton;
