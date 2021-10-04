const alertModel = require('./models/alertModel');
const mysql = require('mysql2/promise');
const sequelize = require('./config/db');
const data = require('./MOCK_DATA.json');

const values = data;

const database = process.env.SECRET_DATABASE || 'alerts';
const user = process.env.SECRET_USERNAME || 'root';
const password = process.env.SECRET_PASSWORD || '1234';
const host = process.env.SECRET_HOST || 'mysql';
const port = process.env.SECRET_PORT || 3306;

const script = async () => {
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS ${database}`);

  await sequelize
    .sync()
    .then(console.log('Database connected'))
    .catch((e) => console.log(e));

  if (process.argv[2] === '-i') {
    console.log('Uploading mock data');
    for (let i = 0; i < values.length; i++) {
      await alertModel.create(values[i]);
    }
    console.log(`${values.length} Records created`);
    process.exit();
  } else if (process.argv[2] === '-d') {
    const truncate = async () => await alertModel.truncate();
    await truncate();
    process.exit();
  } else {
    console.log('An error has been occured');
    process.exit();
  }
};

script();
