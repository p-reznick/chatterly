const Users = {
  login: function (req, res) {
    this.db.getConnection(function (err, connection) {
      if (err) {
          res.status(501).send(err.message);
          connection.release();
          return;
      }
      const sql = 'SELECT * FROM users WHERE handle = ?';
      const handle = req.params['handle'];
      connection.query(sql, [handle], function (err, results, field) {
        if (err) {
          // if db error
            res.status(501).send(err.message);
            connection.release();
            return;
        } else if (results.length === 0) {
          // if no such user in db
          res.status(404);
          connection.release();
          res.json({
            errorMessage: "No such handle!  Please choose a valide handle."
          });
        } else {
          // if user is present in db
          res.status(200);
          connection.release();
          res.json(results[0]);
        }
      });
    });
  },
  createHandle: function (req, res) {
    this.db.getConnection(function (err, connection) {
      if (err) {
          res.status(501).send(err.message);
          connection.release();
          return;
      }
      const sql = 'INSERT INTO users (handle) VALUES (?)';
      const handle = req.params['handle'];
      connection.query(sql, [handle], function (err, results, field) {
        if (err) {
          // if handle already exists
          res.status(501);
          res.json({
            errorMessage: "That handle already exists.  Pick another!"
          });
          connection.release();
          return;
        }
        res.status(201);
        const selectSql = "SELECT * FROM users WHERE handle = ?";
        connection.query(selectSql, [handle], function (err, results, field) {
          if (err) {
            // if handle isn't present
            res.status(501).send(err.message);
            connection.release();
            return;
          } else {
            // if handle is successfully written into db, it's returned back to client
            connection.release();
            res.json(results[0]);
          }
        });
      });
    });
  }
};

module.exports = Users;
