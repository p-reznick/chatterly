import React, { Component } from 'react';

class RefreshButton extends Component {
  render() {
    return (
      <form onSubmit={this.props.refresh_comments}>
        <input type="submit" value="Refresh" />
      </form>
    )
  }
}

export default RefreshButton;
