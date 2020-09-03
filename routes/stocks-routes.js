console.log("stock-routes");

const express = require('express');

const stocksControllers = require('../controllers/stocks-controllers');

const router = express.Router();

// patch - update portfolio stocks via user id
router.patch('/user/:uid', stocksControllers.updatePortfolioStocks), 



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
// http://localhost:5000/api/stocks
// http://localhost:5000/api/stocks?user_id=jaleintzx&email=jaleintz@gmail.com&phone=651-999-9998
// {
//   "user_id" : "jaleintzx2",
//   "email" : "jaleintz@gmail.com",
//   "phone" : "651-999-9998",
//   "name" : {"first" : "John", "last" : "Leintz"},
//   "stocks" : [
//     { "portfolio" : "Wonder Stocks", "ticker" : "ZM" }
//   ]
// }

router.post('/', stocksControllers.createPortfolio);

// http://localhost:5000/api/stocks/jaleintz
router.delete('/:uid', stocksControllers.deletePortfolioStocks), 


module.exports = router;