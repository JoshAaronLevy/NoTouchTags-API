const express = require('express');
require('dotenv').config();
const app = express();
const allowedOrigins = [
  'http://localhost',
  'http://localhost:4200',
  'http://localhost:8100',
  'https://tags-dashboard.web.app',
];
const port = parseInt(process.env.PORT || 3000);
const Parse = require('parse/node');

Parse.initialize(process.env.API_KEY, process.env.JAVASCRIPT_KEY);
Parse.serverURL = 'https://parseapi.back4app.com';

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.get('/login', (req, res) => {
  const User = Parse.Object.extend('User');
  const query = new Parse.Query(User);
  query.equalTo('username', req.params.query);
  query
    .find()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get('/tags', (req, res) => {
  const Tags = Parse.Object.extend('Tags');
  const query = new Parse.Query(Tags);
  query
    .find()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get('/tags/:query', (req, res) => {
  const Tags = Parse.Object.extend('Tags');
  const query = new Parse.Query(Tags);
  query.equalTo('ownerEmail', req.params.query);
  query
    .find()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

app
  .listen(port)
  .on('error', console.error.bind(console))
  .on(
    'listening',
    console.log.bind(console, 'Listening on ' + `http://localhost:${port}`)
  );
