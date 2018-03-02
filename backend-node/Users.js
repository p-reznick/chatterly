const Users = {
  login: function (req, res) {
    this.db.getConnection(function (err, connection) {
      if (err) {
          res.status(501).send(err.message);
          return;
      }
      const sql = 'SELECT * FROM users WHERE handle = ?';
      const handle = req.params['handle'];
      connection.query(sql, [handle], function (err, results, field) {
        if (err) {
            res.status(501).send(err.message);
            connection.release();
            return;
        }
        res.status(200);
        res.json(results[0]);
      });
    });
  },
  createHandle: function (req, res) {
    this.db.getConnection(function (err, connection) {
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
  }
};

module.exports = Users;
