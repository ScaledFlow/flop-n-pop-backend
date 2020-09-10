console.log("portfolios-routes");

const express = require('express');
const { check } = require('express-validator');

const portfoliosControllers = require('../controllers/portfolios-controllers');

const router = express.Router();

// get - stock by ticker
// http://localhost:5000/api/stocks/appl
router.get('/:tid', portfoliosControllers.getStockByTicker);

// get - portfolio by user id
// http://localhost:5000/api/stocks/user/jaleintz
router.get('/user/:uid', portfoliosControllers.getStockPortfolioByUserID );

// get - portfolio by id
// http://localhost:5000/api/stocks/id/005975b3-500b-4c47-999b-2d03912146b1
router.get('/id/:id', portfoliosControllers.getStocksPortfolioByID );

// http://localhost:5000/api/stocks

// {
//   "user_id" : "jaleintzx",
//   "email" : "jaleintz@gmail.com",
//   "phone" : "651-999-9999",
//   "name" : {"first" : "John", "last" : "Leintz"},
//   "stocks" : [
//     { "portfolio" : "Wonder Stocks", "ticker" : "ZM" }
//   ]
// }
router.post('/', portfoliosControllers.createPortfolio);

router.patch('/:uid', portfoliosControllers.updatePortfolioById);

// http://localhost:5000/api/stocks/jaleintz
router.delete('/:uid', portfoliosControllers.deletePortfolioStocks), 


module.exports = router;