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
    connection.query('INSERT INTO users (handle) VALUES (?)', [req.params['handle']], function (err, results, field) {
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

// app.get('/test', function (req, res) {
//     db.getConnection(function (err, connection) {
//         if (err) {
//             res.status(501).send(err.message);
//             return;
//         }
//         connection.query('SELECT * FROM rooms', function (err, results, fields) {
//             if (err) {
//                 res.status(501).send(err.message);
//                 connection.release();
//                 return;
//             }
//             res.json({
//                 result: results,
//                 backend: 'nodejs',
//             });
//             connection.release();
//         });
//     });
// });

app.listen(8000, function() {
    console.log('Listening on port 8000');
});
