console.log("stocks-controllers");

// middleware functions

const { v4: uuidv4 } = require('uuid');
const { validationResults } = require('express-validator');

const HttpError = require('../models/http-error');
const Portfolio = require('../models/portfolio');

let DUMMY_PORTFOLIO = 
[
  {
    "id" : "005975b3-500b-4c47-999b-2d03912146b1",
    "user_id" : "jaleintz",
    "email" : "jaleintz@gmail.com",
    "phone" : "651-999-9999",
    "name" : {"first" : "John", "last" : "Leintz"},
    "stocks" : [
    { "portfolio" : "Wonder Stocks", "ticker" : "appl" },
    { "portfolio" : "Wonder Stocks", "ticker" : "tsla" },
    { "portfolio" : "Legacy Auto", "ticker" : "gm" },
    { "portfolio" : "Legacy Auto", "ticker" : "f" }
    ]
  },
  {
    "id" : "005975b3-500b-4c47-999b-2d03912146b2",
    "user_id" : "bajohnson",
    "email" : "bajohnson.com",
    "phone" : "651-888-88888",
    "name" : {"first" : "Bob", "last" : "Johnson"},
    "stocks" : [
    { "portfolio" : "Wonder Stocks", "ticker" : "appl" },
    { "portfolio" : "Wonder Stocks", "ticker" : "tsla" },
    { "portfolio" : "Legacy Auto", "ticker" : "gm" },
    { "portfolio" : "Legacy Auto", "ticker" : "f" }
    ]
  }
  ]

const getStockByTicker = (req, res, next) => {
  console.log("getStockByTicker");
  const tickerId = req.params.tid;

  if (!tickerId) {
    return res.status('404').json({message: 'Ticker not received'})
  }

  res.json({stock: tickerId});
};

const getStocksPortfolioByID = (req, res, next) => {
  console.log("getStocksPortfolioByID");
  const id = req.params.id;
  console.log(id);
  const user = DUMMY_PORTFOLIO.find(u => {
    return u.id === id;
  });

  // Error for middleware
  if (!user) {
    return next(
      new HttpError('Could not find the user_id', 404)
    );
  }

  res.json({user: user});
}

const getStockPortfolioByUserID = (req, res, next) => {
  console.log("getStockPortfolioByUserID");
  const userId = req.params.uid;
  console.log(userId);
  const user = DUMMY_PORTFOLIO.find(u => {
    return u.user_id === userId;
  });

  // Error for middleware
  if (!user) {
    return next(
      new HttpError('Could not find the user_id', 404)
    );
  }

  res.json({user: user});
}

// const createdPortfolio = (req, res, next ) => {
//   console.log("createdPortfolio");
//   console.log("log body from createdPortfolio: " + req.body);
//   const { user_id, email, phone, name, stocks} = req.body;
//   const createdPortfolio = {
//     id: uuidv4(),
//     user_id,
//     email,
//     phone,
//     name : name,
//     stocks: stocks
//   };
//   DUMMY_PORTFOLIO.push(createdPortfolio);  //upshift()
//   console.log(DUMMY_PORTFOLIO);
//   res.status(201).json({portfolio: createdPortfolio})
// };


const createdPortfolio = (req, res, next ) => {
  console.log("createdPortfolio");
  console.log("log body from createdPortfolio: " + req.body);
  const { user_id, email, phone, name, stocks} = req.body;
  const createdPortfolio = {
    id: uuidv4(),
    user_id,
    email,
    phone,
    name : name,
    stocks: stocks
  };
  DUMMY_PORTFOLIO.push(createdPortfolio);  //upshift()
  console.log(DUMMY_PORTFOLIO);
  res.status(201).json({portfolio: createdPortfolio})
};


// http://localhost:5000/api/stocks/jaleintz@gmail.com
// {
//   "email" : "jaleintz@gmail.com",
//   "stocks" : [
//   { "portfolio" : "Wonder Stocks", "ticker" : "appl" }
//   ]
// }

// http://localhost:5000/api/stocks/jaleintz
const updatePortfolioById = (req, res, next ) => {
  console.log("updatePortfolioStocks");
  console.log(req.body.email);
  const userId = req.params.uid;
  console.log(userId);

  const updatedPortfolio = { ...DUMMY_PORTFOLIO.find(u => u.id = userId)};
  console.log(updatedPortfolio);

  // note - need to figure out how to push portfolio section (to be added) to 
  // object array. 
``
}

const deletePortfolioStocks = (req, res, next ) => {
  console.log("deletePortfolioStocks");
  const userId = req.params.uid;
  console.log(userId);
  DUMMY_PORTFOLIO = DUMMY_PORTFOLIO.filter(u => u.user_id !== userId);
  console.log(DUMMY_PORTFOLIO);
  res.status(200).json({ message: 'Deleted Portfolio.'});
};

exports.getStockByTicker = getStockByTicker;
exports.getStockPortfolioByUserID = getStockPortfolioByUserID;
exports.getStocksPortfolioByID = getStocksPortfolioByID;
exports.createPortfolio = createdPortfolio;
exports.updatePortfolioById = updatePortfolioById;
exports.deletePortfolioStocks = deletePortfolioStocks;