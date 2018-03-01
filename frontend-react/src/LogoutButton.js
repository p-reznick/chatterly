import React, { Component } from 'react';

class LogoutButton extends Component {
  render() {
    return (
      <form onSubmit={this.props.logout_user}>
        <input type="submit" value="Logout" />
      </form>
    )
  }
}

export default LogoutButton;
