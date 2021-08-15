import { Router } from 'express';

const tweets = [];
const users = [];

class Tweet {
  constructor(text, username) {
    this.id = Date.now();
    this.text = text;
    this.username = username;
    this.name = users.find((user) => user.username === username).name;
    this.url = users.find((user) => user.username === username).url;
    this.createdAt = new Date();
  }
}

class User {
  constructor(username, name, url = 'default image') {
    this.username = username;
    this.name = name;
    this.url = url;
    this.createdAt = new Date();
  }
}

users.push(new User('muho', '므호'));
users.push(new User('mhjung', '정명훈'));

const router = Router();

router.get('/', (req, res) => {
  if (req.query.username) {
    const filteredTweets = tweets.filter(
      (tweet) => tweet.username == req.query.username
    );

    if (filteredTweets.length == 0) {
      return res.status(404).send('Data is not exist!');
    }

    return res.json(filteredTweets);
  }

  res.json(tweets);
});

router.get('/:id', (req, res) => {
  const tweet = tweets.find((tweet) => tweet.id == req.params.id);

  if (!tweet) {
    return res.status(404).send('Data is not exist!');
  }

  res.json(tweet);
});

router.post('/', (req, res) => {
  const tweet = new Tweet(req.body.text, req.body.username);
  tweets.push(tweet);

  res.status(201).json(tweet);
});

router.put('/:id', (req, res) => {
  const tweet = tweets.find((tweet) => tweet.id == req.params.id);

  if (!tweet) {
    return res.status(404).send('Data is not exist!');
  }

  tweet.text = req.body.text;

  res.json(tweet);
});

router.delete('/:id', (req, res) => {
  const tweet = tweets.find((tweet) => tweet.id == req.params.id);

  if (!tweet) {
    return res.status(404).send('Data is not exist!');
  }

  const tweetIndex = tweets.indexOf(tweet);
  tweets.splice(tweetIndex, 1);

  res.sendStatus(204);
});

export default router;
