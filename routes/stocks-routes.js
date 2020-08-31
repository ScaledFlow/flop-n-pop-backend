const express = require('express');

const stocksControllers = require('../controllers/stocks-controllers');

const router = express.Router();

// get stock by ticker
// http://localhost:5000/api/stocks/appl
router.get('/:tid', stocksControllers.getStockByTicker);

// get portfolio by user id
// http://localhost:5000/api/stocks/user/jaleintz
// http://localhost:5000/api/stocks/user/bajohnson
router.get('/user/:uid', stocksControllers.getStockPortfolioByID );


module.exports = router;