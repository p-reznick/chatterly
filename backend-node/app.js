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
app.get('/users/:handle', function (req, res) {
  db.getConnection(function (err, connection) {
    if (err) {
        res.status(501).send(err.message);
        return;
    }
    const sql = 'SELECT users.id FROM users WHERE handle = ?';
    const handle = req.params['handle'];
    connection.query(sql, [handle], function (err, results, field) {
      if (err) {
          res.status(501).send(err.message);
          connection.release();
          return;
      }
      res.status(200);
      res.json(results);
    });
  });
});

// create user POST users/:handle
app.post('/users/:handle', function (req, res) {
  db.getConnection(function (err, connection) {
    if (err) {
        res.status(501).send(err.message);
        return;
    }
    const sql = 'INSERT INTO users (handle) VALUES (?)';
    const handle = req.params['handle']
    connection.query(sql, [handle], function (err, results, field) {
      if (err) {
          res.status(501).send(err.message);
          connection.release();
          return;
      }
      res.status(201);
      const selectSql = "SELECT * FROM users WHERE handle = ?";
      connection.query(selectSql, [handle], function (err, results, field) {
        if (err) {
            res.status(501).send(err.message);
            connection.release();
            return;
        }
        res.json(results[0]);
      });
    });
  });
});

// create user comment in chat room
app.post('/rooms/:room_id/users/:user_id/comments/:body', function (req, res) {
  db.getConnection(function (err, connection) {
    const userId = req.params['user_id'];
    const body = req.params['body'];
    const roomId = req.params['room_id']
    const sql = 'INSERT INTO comments (user_id, body, room_id) VALUES (?, ?, ?)'
    connection.query(sql, [userId, body, roomId], function (err, results, field) {
      if (err) {
          res.status(501).send(err.message);
          connection.release();
          return;
      }
      res.status(201);
      res.send(body + ' written into comments!');
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
    const roomId = req.params['room_id'];
    const sql = "SELECT comments.id, comments.body, comments.user_id, users.handle FROM comments JOIN users ON comments.user_id = users.id WHERE comments.room_id = ?";
    connection.query(sql, [roomId], function(err, results, field) {
      if (err) {
        res.status(500).send(err.message);
        connection.release();
        return;
      }
      res.json(results);
    });
  });
});

// get all comments for given room after a particular comment
app.get('/rooms/:room_id/comments/:last_comment_id', function(req, res) {
  db.getConnection(function (err, connection) {
    if (err) {
      res.status(500).send(err.message);
      connection.release();
      return;
    }
    const roomId = req.params['room_id'];
    const lastId = req.params['last_comment_id'];
    const sql = "SELECT comments.body, comments.user_id, users.handle FROM comments JOIN users ON comments.user_id = users.id WHERE comments.room_id = ? AND comments.id > ?";
    connection.query(sql, [roomId, lastId], function(err, results, field) {
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
