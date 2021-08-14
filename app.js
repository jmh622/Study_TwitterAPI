import express from "express";
import helmet from "helmet";
import cors from "cors";

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
  constructor(username, name, url = "default image") {
    this.username = username;
    this.name = name;
    this.url = url;
    this.createdAt = new Date();
  }
}

users.push(new User("muho", "므호"));
users.push(new User("mhjung", "정명훈"));

const app = express();

app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.get("/tweets", (req, res) => {
  if (req.query.username) {
    return res.send(
      tweets.filter((tweet) => tweet.username == req.query.username)
    );
  }

  res.send(tweets);
});

app.get("/tweets/:id", (req, res) => {
  res.send(tweets.find((tweet) => tweet.id == req.params.id));
});

app.post("/tweets", (req, res) => {
  const tweet = new Tweet(req.body.text, req.body.username);
  tweets.push(tweet);

  res.status(201).send(tweet);
});

app.put("/tweets/:id", (req, res) => {
  const tweet = tweets.find((tweet) => tweet.id == req.params.id);

  tweet.text = req.body.text;

  res.send(tweet);
});

app.delete("/tweets/:id", (req, res) => {
  const tweet = tweets.find((tweet) => tweet.id == req.params.id);
  const tweetIndex = tweets.indexOf(tweet);
  tweets.splice(tweetIndex, 1);

  res.sendStatus(204);
});

app.use("/", (req, res) => {
  res.sendStatus(404);
});

app.listen(8080);
