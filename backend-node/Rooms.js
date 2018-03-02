const Rooms = {
  createComment: function (req, res) {
    this.db.getConnection(function (err, connection) {
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
  },
  getComments: function(req, res) {
    this.db.getConnection(function (err, connection) {
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
  },
  getNewComments: function(req, res) {
    this.db.getConnection(function (err, connection) {
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
  }
};

module.exports = Rooms;
