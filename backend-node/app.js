const express = require('express');
const mysql = require('mysql');
const Users = require('./Users');
const Rooms = require('./Rooms');
const Utility = require('./Utility');

const app = express();

// Application endpoints to satisfy project requirements
app.get('/users/:handle', Users.login);
app.post('/users/:handle', Users.createHandle);
app.post('/rooms/:room_id/users/:user_id/comments/:body', Rooms.createComment);
app.get('/rooms/:room_id/comments', Rooms.getComments);
app.get('/rooms/:room_id/comments/:last_comment_id', Rooms.getNewComments);
// Utility endpoints to be used for debugging
app.get('/rooms', Utility.getAllRooms);
app.get('/comments', Utility.getAllComments);
app.get('/users', Utility.getAllUsers);

app.listen(8000, function() {
    console.log('Listening on port 8000');
});
