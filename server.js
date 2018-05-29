import express from 'express';
import mysql from 'mysql';
import process from './env.config';

const app = express();

const connection = mysql.createConnection({
  host: process.NODE_DB_HOST,
  user: process.NODE_DB_USERNAME,
  password: process.NODE_DB_PASSWORD,
  database: process.NODE_DB_DATABASE
});

app.get('/', (req, res) => {
  connection.query(`select * from users where deleted_at is NULL`, (err, results) => {
    if (err) {
      return res.send(err);
    }
    res.send(results);
  });
});

app.listen(3333);
