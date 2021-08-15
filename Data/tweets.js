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

tweets.push(new Tweet('MVC test', 'muho'));

class TweetsRepository {
  static getAll = async () => {
    return tweets;
  };

  static getAllByUsername = async (username) => tweets.filter((tweet) => tweet.username == username);

  static getById = async (id) => tweets.find((tweet) => tweet.id == id);

  static create = async ({ text, username }) => {
    const tweet = new Tweet(text, username);
    tweets.push(tweet);
    return tweet;
  };

  static update = async ({ id, text }) => {
    const tweet = tweets.find((tweet) => tweet.id == id);
    tweet.text = text;
    return tweet;
  };

  static delete = async (id) => {
    const tweet = tweets.find((tweet) => tweet.id == id);
    const tweetIndex = tweets.indexOf(tweet);
    tweets.splice(tweetIndex, 1);
  };
}

export default TweetsRepository;
