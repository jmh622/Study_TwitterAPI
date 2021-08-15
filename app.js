import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import tweetsRouter from './router/tweets.js';
import morgan from 'morgan';
import 'express-async-errors';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));
app.use(
  cors({
    origin: ['http://localhost:3000'],
  })
);

app.use('/tweets', tweetsRouter);

app.use((req, res) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(8080);
