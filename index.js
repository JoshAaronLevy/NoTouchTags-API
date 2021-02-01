const express = require('express');
const app = express();
// const allowedDomains = ['http://localhost:4200', 'https://tags-dashboard.web.app'];
const port = parseInt(process.env.PORT || 3000);
const Parse = require('parse/node');

Parse.initialize('w17nTT0TMtIjiH1qzS4r6zAGig6EOAHNpncny7VF', 'kBlbaoq8fd2KblWBNEApECYIEPiCF8CqZyWvXYK2');
Parse.serverURL = 'https://parseapi.back4app.com';

// app.use(cors({
//   origin: function (origin, callback) {
//     // bypass the requests with no origin (like curl requests, mobile apps, etc )
//     if (!origin) return callback(null, true);

//     if (allowedDomains.indexOf(origin) === -1) {
//       var msg = `This site ${origin} does not have access. Only specific domains are allowed to access it.`;
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   }
// }));

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  const allowedOrigins = ['http://localhost:4200', 'https://tags-dashboard.web.app'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  // res.setHeader('Access-Control-Allow-Origin', allowedOrigins);

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

app.listen(port)
  .on('error', console.error.bind(console))
  .on('listening', console.log.bind(console, 'Listening on ' + `http://localhost:${port}`));
