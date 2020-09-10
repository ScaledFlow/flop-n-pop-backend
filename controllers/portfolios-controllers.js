console.log("portfolios-controllers");

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
    "portfolios" : [
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

// http://localhost:5000/api/portfolios/5f5a6a61563c73468cafc8d0

const getPortfolioById = async (req, res, next) => {
  
  console.log("getPortfolioById");
  const portfolioId = req.params.id;
  console.log(portfolioId);

  let portfolio;

  try {
    portfolio = await Portfolio.findById(portfolioId);
    console.log(portfolio);
  } catch (err) {
    const error = new HttpError('Failed, could not find portfolio by id.', 500);
    return next(error);
  }

  if (!portfolio) {
    const error = new HttpError('Could not find the user_id', 404);
    return next(error);
  }

  res.json({portfolio: portfolio.toObject({ getters: true })});
}

// getStockPortfolioByEmail

// http://localhost:5000/api/portfolios/email/johnleintz@scaledflow.com

const getPortfolioByEmail = async (req, res, next) => {
  
  console.log("getPortfolioByEmail");
  const email = req.params.email;
  console.log(email);

  let portfolio;

  try {
    portfolio = await Portfolio.find({ email: email});
  } catch(err) {
    const error = new HttpError('Fetching portfolio by email failed', 404);
    return next(error);
  }

  if (!portfolio || portfolio.length === 0) {
    return next(
      new HttpError('Could not find portfolio by email', 404)
    );
  };

  res.json({portfolio: portfolio.map(portfolio => portfolio.toObject({
     getters: true}))});
};

// http://localhost:5000/api/portfolios

// {
//   "email": "johnleintz@scaledflow.com",
//   "name" : {"first" : "John", "last" : "Leintz"},
//   "portfolios" : [
//      { "portfolio" : "Wonder Stocks", "ticker" : "appl" },
//      { "portfolio" : "Legacy Auto", "ticker" : "gm" },
//      { "portfolio" : "Legacy Auto", "ticker" : "f" }
//   ]
// }

const createdPortfolio = async (req, res, next ) => {
  console.log("createdPortfolio");
  console.log("log body from createdPortfolio: " + req.body);
  const { email, name, portfolios} = req.body;
  const createdPortfolio = new Portfolio ({
    email,
    name,
    portfolios
  });
  
  try {
    await createdPortfolio.save();
  } catch (err) {
    const error = new HttpError(
      'Create portfolio failed, please try again.', 500);
    return next(error);
  }

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
exports.getPortfolioByEmail = getPortfolioByEmail;
exports.getPortfolioById = getPortfolioById;
exports.createPortfolio = createdPortfolio;
exports.updatePortfolioById = updatePortfolioById;
exports.deletePortfolioStocks = deletePortfolioStocks;