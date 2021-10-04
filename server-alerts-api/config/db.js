const { Sequelize } = require('sequelize');

const database = process.env.SECRET_DATABASE || 'alerts';
const username = process.env.SECRET_USERNAME || 'root';
const password = process.env.SECRET_PASSWORD || '1234';
const host = process.env.SECRET_HOST || 'mysql';
const port = process.env.SECRET_PORT || 3306;

const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;
