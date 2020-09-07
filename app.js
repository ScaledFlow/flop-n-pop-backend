console.log("app.js");

const express = require('express');
const bodyParser = require('body-parser');

const stocksRoutes = require('./routes/stocks-routes');
const usersRoutes = require('./routes/users-routes');
const quotesRoutes = require('./routes/quotes-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/api/stocks', stocksRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/quotes', quotesRoutes);

app.use((req, res, next) => {
  console.log("app request body: " + req.body.email);
  console.log("app request body: " + req.body.password);
  const error = new HttpError('Could not find this route', 404);
  console.log("hit generic error: " + error);
  throw error;
});

// Middleware error handling
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500)
  res.json({message: error.message || 'An unknown error occured!'})
})

app.listen(5000);