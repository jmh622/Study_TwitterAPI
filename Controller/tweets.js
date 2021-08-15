import tweetRepository from '../Data/tweets.js';

class TweetsController {
  static getAll = async (req, res) => {
    if (req.query.username) {
      return res.json(await tweetRepository.getAllByUsername(req.query.username));
    }

    res.json(await tweetRepository.getAll());
  };

  static getById = async (req, res) => {
    const tweet = await tweetRepository.getById(req.params.id);

    if (!tweet) {
      return res.status(404).send('Data is not exist!');
    }

    res.json(tweet);
  };

  static create = async (req, res) => {
    const tweet = await tweetRepository.create({
      text: req.body.text,
      username: req.body.username,
    });

    res.status(201).json(tweet);
  };

  static update = async (req, res) => {
    const tweet = await tweetRepository.getById(req.params.id);

    if (!tweet) {
      return res.status(404).send('Data is not exist!');
    }

    const updatedTweet = await tweetRepository.update({
      id: req.params.id,
      text: req.body.text,
    });

    res.json(updatedTweet);
  };

  static delete = async (req, res) => {
    const tweet = await tweetRepository.getById(req.params.id);

    if (!tweet) {
      return res.status(404).send('Data is not exist!');
    }

    tweetRepository.delete(req.params.id);

    res.sendStatus(204);
  };
}

export default TweetsController;
