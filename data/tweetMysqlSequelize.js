import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../db/database.js';
import { User } from './auth.js';

const Tweet = sequelize.define('tweet', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Tweet.belongsTo(User);

const FIND_OPTIONS = {
  attributes: [
    'id',
    'text',
    'createdAt',
    'userId',
    [Sequelize.col('user.name'), 'name'],
    [Sequelize.col('user.username'), 'username'],
    [Sequelize.col('user.url'), 'url'],
  ],
  include: {
    model: User,
    attributes: [],
  },
};

const ORDER_BY = {
  order: [['createdAt', 'DESC']],
};

export async function getAll() {
  return Tweet.findAll({
    ...FIND_OPTIONS,
    ...ORDER_BY,
  }).then((data) => data);
}

export async function getAllByUsername(username) {
  return Tweet.findAll({
    ...FIND_OPTIONS,
    ...ORDER_BY,
    include: {
      ...FIND_OPTIONS.include,
      where: { username },
    },
  }).then((data) => data);
}

export async function getById(id) {
  return Tweet.findByPk(id, FIND_OPTIONS).then((data) => data);
}

export async function create(text, userId) {
  return Tweet.create({ text, userId }).then((data) =>
    getById(data.dataValues.id)
  );
}

export async function update(id, text) {
  return Tweet.findByPk(id, FIND_OPTIONS).then((tweet) => {
    tweet.text = text;
    return tweet.save();
  });
}

export async function remove(id) {
  Tweet.findByPk(id, FIND_OPTIONS).then((tweet) => tweet.destroy());
}
