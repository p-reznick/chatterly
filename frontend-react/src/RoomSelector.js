import React, { Component } from 'react';
import RoomDropDownInput from './RoomDropDownInput';

class RoomSelector extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({
      newRoom: ''
    }, this.state);
    this.enterRoom = this.props.enter_room;
    this.handleError = this.props.handle_error;
    this.handleNewRoomChange = this.handleNewRoomChange.bind(this);
    this.handleRoomCreation = this.handleRoomCreation.bind(this);
  }

  handleNewRoomChange(event) {
    event.preventDefault();
    this.setState({ newRoom: event.target.value });
  }

  handleRoomCreation(event) {
    event.preventDefault();
    const url = "rooms/" + this.state.newRoom;
    fetch(url, {
      method: 'POST'
    }).then((res) => (
      res.json()
    )).then((res) => {
      if (res.errorMessage) {
        this.handleError(res.errorMessage);
        return;
      }
      this.enterRoom(this.state.newRoom, res[0].id);
    });
  }

  render() {
    const createRoom = this.props.createRoom;
    const rooms = this.props.rooms;
    return (
      <div>
        <form onSubmit={this.handleRoomCreation}>
          <label htmlFor="newRoom">Create a new room!</label>
          <div>
            <input
              type="text"
              id="newRoom"
              placeholder="New room name"
              onChange={this.handleNewRoomChange}
            />
          </div>
          <div className="row">
            <input
              className="button-primary"
              type="submit"
              value="Create"
            />
          </div>
        </form>
        <RoomDropDownInput
          enter_room={this.enterRoom}
          handle_error={this.handleError}
          id='room_drop_down'
          rooms={rooms}
        />
      </div>
    );
  }
}

export default RoomSelector;
