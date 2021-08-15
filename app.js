import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import tweetsRouter from './router/tweetsRouter.js';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: ['http://localhost:3000'],
  })
);

app.use('/tweets', tweetsRouter);

app.use('/', (req, res) => {
  res.sendStatus(404);
});

app.listen(8080);
