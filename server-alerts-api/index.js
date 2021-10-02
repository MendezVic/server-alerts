const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('It work');
});

const server = app.listen(8080, function () {
  const port = server.address().port;
  console.log('Example app listening at http://localhost:%s', port);
});
