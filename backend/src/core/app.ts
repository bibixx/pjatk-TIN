import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';

export const app = express();

app.use(express.static(path.join(__dirname, '../static')));
app.enable('strict routing');

app.use(morgan('dev'));
app.use(bodyParser.json({}));
