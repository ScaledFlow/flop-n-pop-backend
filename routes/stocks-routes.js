const express = require('express');

const stocksControllers = require('../controllers/stocks-controllers');

const router = express.Router();

// get - stock by ticker
// http://localhost:5000/api/stocks/appl
router.get('/:tid', stocksControllers.getStockByTicker);

// get - portfolio by user id
// http://localhost:5000/api/stocks/user/jaleintz
// http://localhost:5000/api/stocks/user/bajohnson
router.get('/user/:uid', stocksControllers.getStockPortfolioByUserID );

// get - portfolio by id
// http://localhost:5000/api/stocks/id/005975b3-500b-4c47-999b-2d03912146b1
// http://localhost:5000/api/stocks/id/005975b3-500b-4c47-999b-2d03912146b2
router.get('/id/:id', stocksControllers.getStocksPortfolioByID );

// post - create portfolio
router.post('/', stocksControllers.createPortfolio);


module.exports = router;