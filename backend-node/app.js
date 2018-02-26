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
// send message POST messages
// fetch messages GET messages
// fetch new messages

app.get('/test', function (req, res) {
    db.getConnection(function (err, connection) {
        if (err) {
            res.status(501).send(err.message);
            return;
        }
        connection.query('SELECT * FROM rooms', function (err, results, fields) {
            if (err) {
                res.status(501).send(err.message);
                connection.release();
                return;
            }

            res.json({
                result: results,
                backend: 'nodejs',
            });
            connection.release();
        });
    });
});

app.listen(8000, function() {
    console.log('Listening on port 8000');
});
