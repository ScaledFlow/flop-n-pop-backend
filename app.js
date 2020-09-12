console.log("app.js");

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const portfoliosRoutes = require('./routes/portfolios-routes');
const usersRoutes = require('./routes/users-routes');
const quotesRoutes = require('./routes/quotes-routes');
const placesRoutes = require('./routes/places-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/api/portfolios', portfoliosRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/quotes', quotesRoutes);
app.use('/api/places', placesRoutes);

app.use((req, res, next) => {
  console.log(req.url);
  console.log("app request body: " + req.body.email);
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

mongoose
  .connect('mongodb+srv://admin:dbPassAtlas8453@cluster0.76p3z.mongodb.net/stock_test?retryWrites=true&w=majority',  {useUnifiedTopology: true, useNewUrlParser: true})
  .then(() => {
    app.listen(5000);
    console.log('Server Started');
  }) 
  .catch(err => {
    console.log(err);
  });