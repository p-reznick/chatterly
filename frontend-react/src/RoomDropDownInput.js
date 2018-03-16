import React, { Component } from 'react';

class RoomDropDownInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleRoomEntry = this.handleRoomEntry.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  handleOptionChange(event) {
    this.setState({
      roomName: event.target.value
    });
  }

  handleRoomEntry(event) {
    event.preventDefault();
    const roomName = this.state.roomName;
    const url = "rooms/" + roomName;
    fetch(url).then((res) => (
      res.json()
    )).then((res) => {
      if (res.errorMessage) {
        this.props.handle_error(res.errorMessage);
        return;
      }
      this.props.enter_room(this.state.roomName, res[0].id);
    });
  }

  render() {
    const rooms = this.props.rooms;

    let content;

    if (rooms.length === 0) {
      content = (
        <p>No rooms to show...</p>
      );
    } else {
      const roomOptions = rooms.map((roomObj) => (
        <option value={roomObj.name}>{roomObj.name}</option>
      ));
      content = (
        <select className="row" onChange={this.handleOptionChange} name="room_drop_down">
          {roomOptions}
        </select>
      );
    }
    return (
      <form onSubmit={this.handleRoomEntry}>
        <label htmlFor="room_drop_down">Enter an existing room!</label>
        {content}
        <div className="row">
          <input
            className="button-primary"
            type="submit"
            value="Enter"
          />
        </div>
      </form>
    )
  }
}

export default RoomDropDownInput;
