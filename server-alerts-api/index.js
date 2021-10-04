const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const alertRoute = require('./routes/alertRoute');
const app = express();
require('dotenv').config();

// Import Middleware
const errorHandler = require('./middleware/errorHandler');

app.get('/', (req, res) => {
  res.send('It work');
});

// Enable CORS
app.use(cors());

// Body Parser
app.use(express.json());

// Alert Router
app.use('/api/v1/alerts', alertRoute);

// Use Middlewares
app.use(errorHandler);

const server = app.listen(8080, async function () {
  await sequelize
    .sync()
    .then(() => console.log('Connection has been established successfully.'))
    .catch((e) => console.log(e));

  const port = server.address().port;
  console.log('Example app listening at http://localhost:%s', port);
});
