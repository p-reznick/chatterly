const express = require('express');
const mysql = require('mysql');
const Users = require('./Users');
const Rooms = require('./Rooms');
const Utility = require('./Utility');

const app = express();
this.db = mysql.createPool({
    host: 'db',
    user: 'root',
    password: 'testpass',
    database: 'challenge',
});

// Application endpoints to satisfy project requirements
app.get('/users/:handle', Users.login.bind(this));
app.post('/users/:handle', Users.createHandle.bind(this));
app.post('/rooms/:room_id/users/:user_id/comments/:body', Rooms.createComment.bind(this));
app.get('/rooms/:room_id/comments', Rooms.getComments.bind(this));
app.get('/rooms/:room_id/comments/:last_comment_id', Rooms.getNewComments.bind(this));

// Utility endpoints to be used for debugging
app.get('/rooms', Utility.getAllRooms.bind(this));
app.get('/comments', Utility.getAllComments.bind(this));
app.get('/users', Utility.getAllUsers.bind(this));

app.listen(8000, function() {
    console.log('Listening on port 8000');
});
