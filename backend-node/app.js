const express = require('express');
const mysql = require('mysql');

const app = express();
const db = mysql.createPool({
    host: 'db',
    user: 'root',
    password: 'testpass',
    database: 'challenge',
});

// login user GET users/:id
// create user POST users/:handle
app.post('/users/:handle', function (req, res) {
  db.getConnection(function (err, connection) {
    if (err) {
        res.status(501).send(err.message);
        return;
    }
    const sql = 'INSERT INTO users (handle) VALUES (?)';
    connection.query(sql, [req.params['handle']], function (err, results, field) {
      if (err) {
          res.status(501).send(err.message);
          connection.release();
          return;
      }
      res.status(201);
      res.send(req.params['handle'] + ' delivered!');
    });
  });
});

// create user comment in message board
app.post('/users/:handle/comments/:body', function (req, res) {
  db.getConnection(function (err, connection) {
    const handle = req.params['handle'];
    const sql = 'SELECT id FROM users WHERE handle = ?';
    connection.query(sql, [handle], function(err, results, field) {
      if (err) {
        res.status(501).send(err.message);
        connection.release();
        return;
      }
      const userId = results[0];
      const body = req.params['body'];
      const roomId = 1; // update later to accommodate multiple rooms.
      const sql = 'INSERT INTO comments (user_id, body, room_id) VALUES (?, ?, ?)'
      connection.query(sql, [userId, body, roomId], function (err, results, field) {
        if (err) {
            res.status(501).send(err.message);
            connection.release();
            return;
        }
        res.status(201);
        res.send(req.params['handle'] + ' delivered!');
      });
    });
  });
});

// get all comments for given room
app.get('/rooms/:room_id/comments', function(req, res) {
  db.getConnection(function (err, connection) {
    if (err) {
      res.status(500).send(err.message);
      connection.release();
      return;
    }
    const room_id = req.params['room_id'];
    const sql = "SELECT comments.body, comments.user_id, users.handle FROM comments JOIN users ON comments.user_id = users.id WHERE comments.room_id = ?";
    connection.query(sql, [room_id], function(err, results, field) {
      if (err) {
        res.status(500).send(err.message);
        connection.release();
        return;
      }
      res.json(results);
    });
  });
});

// utility apis
app.get('/rooms', function(req, res) {
  db.getConnection(function (err, connection) {
    if (err) {
      res.status(500).send(err.message);
      connection.release();
      return;
    }
    const sql = "SELECT * FROM rooms";
    connection.query(sql, function(err, results, field) {
      if (err) {
        res.status(500).send(err.message);
        connection.release();
        return;
      }
      res.json(results);
    });
  });
});

app.get('/comments', function(req, res) {
  db.getConnection(function (err, connection) {
    if (err) {
      res.status(500).send(err.message);
      connection.release();
      return;
    }
    const sql = "SELECT * FROM comments";
    connection.query(sql, function(err, results, field) {
      if (err) {
        res.status(500).send(err.message);
        connection.release();
        return;
      }
      res.json(results);
    });
  });
});

app.get('/users', function(req, res) {
  db.getConnection(function (err, connection) {
    if (err) {
      res.status(500).send(err.message);
      connection.release();
      return;
    }
    const sql = "SELECT * FROM users";
    connection.query(sql, function(err, results, field) {
      if (err) {
        res.status(500).send(err.message);
        connection.release();
        return;
      }
      res.json(results);
    });
  });
});

app.listen(8000, function() {
    console.log('Listening on port 8000');
});
