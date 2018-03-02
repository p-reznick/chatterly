const Utility = {
  getAllRooms: function(req, res) {
    this.db.getConnection(function (err, connection) {
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
  },
  getAllComments: function(req, res) {
    this.db.getConnection(function (err, connection) {
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
  },
  getAllUsers: function(req, res) {
    this.db.getConnection(function (err, connection) {
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
  }
};

module.exports = Utility;
