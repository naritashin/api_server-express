import express from 'express';
import process from './env.config';
import mysql from 'mysql';

const router = express.Router();

const connection = mysql.createConnection({
  host: process.NODE_DB_HOST,
  user: process.NODE_DB_USERNAME,
  password: process.NODE_DB_PASSWORD,
  database: process.NODE_DB_DATABASE
});

router.post('/users/create', (req, res, next) => {
  let sql = 'INSERT INTO ??(??,??,??) VALUES (?,?,?)';
  const table = [
    'users',
    'user_name',
    'mail_address',
    'password',
    req.body.lastName + '_' + req.body.firstName,
    req.body.email,
    md5(req.body.password)
  ];

  const query = mysql.format(sql, table);

  connection.query(query, (err, results) => {
    if (err) {
      res.send(err);
    }
  });
});

router.get('/users', (req, res) => {
  connection.query(`select * from users where deleted_at is NULL`, (err, results) => {
    if (err) {
      return res.send(err);
    }
    res.json(results);
  });
});

module.exports = router;
