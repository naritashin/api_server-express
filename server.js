import express from 'express';
import rest from './REST';

const app = express();

app.use('/api', rest);

app.listen(3333);
