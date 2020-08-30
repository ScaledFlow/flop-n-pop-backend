const express = require('express');
const bodyParser = require('body-parser');

const stocksRoutes = require('./routes/stocks-routes');

const app = express();

app.use('/api/stocks', stocksRoutes);
console.log('from app');

app.listen(5000);