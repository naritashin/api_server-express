import express from 'express';
import mysql from 'mysql';
import process from './env.config';

const app = express();
console.log(process);
app.listen(3333);
