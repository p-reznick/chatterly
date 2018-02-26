const express = require('express');
const mysql = require('mysql');

const app = express();
const db = mysql.createPool({
    host: 'db',
    user: 'root',
    password: 'testpass',
    database: 'challenge',
});

app.get('/test', function (req, res) {
    db.getConnection(function (err, connection) {
        if (err) {
            res.status(501).send(err.message);
            return;
        }
        connection.query('SELECT col FROM test', function (err, results, fields) {
            if (err) {
                res.status(501).send(err.message);
                connection.release();
                return;
            }

            res.json({
                result: results[0].col,
                backend: 'nodejs',
            });
            connection.release();
        });
    });
});

app.listen(8000, function() {
    console.log('Listening on port 8000');
});
