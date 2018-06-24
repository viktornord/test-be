const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./src/routes');
const db = require('./src/db');
const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(routes);

app.use((req, res, next) => {
  res.status(404).send({
    status: 404,
    message: 'Not found'
  });
});

// Basic error handler
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).send({
    status,
    message: status < 500 && err.message ? err.message : 'Server error'
  });
});

db.connect()
  .then(() => http.createServer(app).listen(PORT, () => console.log(`App listening on port ${PORT}`)))
  .catch(console.error);
