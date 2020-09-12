console.log("portfolios-controllers");

const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Portfolio = require('../models/portfolio');
const User = require('../models/user');

const mongooseUniqueValidator = require('mongoose-unique-validator');

// GET
// http://localhost:5000/api/portfolios/5f5bd726f01d164c84f5c8e6git 

const getPortfolioById = async (req, res, next) => {
  const portfolioId = req.params.id;

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

// POST
// http://localhost:5000/api/portfolios

// {
//   "portfolioName": "Amazing Stocks",
//   "assetType": "crypto",
//   "scanAlert": true,
//   "assets" : ["appl", "tsla"],
//   "creator": "5f5c31e0bc347f177c571157"
// }

const createdPortfolio = async (req, res, next ) => {
  const { portfolioName, assetType, scanAlert, assets, creator } = req.body;

  const createdPortfolio = new Portfolio ({
    portfolioName,
    assetType,
    scanAlert,
    assets,
    creator
  });

  console.log(createdPortfolio);

  let user;

  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError('could not find user, please try again', 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError('could not find user for provide id', 404);
    return next (error);
  }
  
  try {
    // await createdPortfolio.save();
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPortfolio.save({ session: sess });
    user.portfolios.push(createdPortfolio);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Create portfolio failed, please try again.', 500);
    return next(error);
  }

  res.status(201).json({portfolio: createdPortfolio})
};

// PATCH
// http://localhost:5000/api/portfolios/5f5c022d7f1cfc3d38394c65
// {
//   "assetType": "metal",
//   "scanAlert": true
// }

const updatePortfolioById = async (req, res, next ) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data: ', 422)
    )
  }

  console.log(req.body);
  const {assetType, scanAlert} = req.body;
  const portfolioId = req.params.pid;
  console.log(portfolioId);

  let portfolio;
  try {
    portfolio = await Portfolio.findById(portfolioId);
  } catch (err) {
    const error = HttpError(
      'Failed, could not update portfolio', 500);
      return next(error);
  }

  portfolio.assetType = assetType;
  portfolio.scanAlert = scanAlert;

  try {
    await portfolio.save();
  } catch (err) {
    const error = HttpError(
      'Failed, could not update portfolio', 500);
      return next(error);
  }

  res.status(200).json({ portfolio: portfolio.toObject({ getters: true}) });
}

// DELETE
// http://localhost:5000/api/portfolios/5f5bd726f01d164c84f5c8e6
// ******* currently deletes all portfolios

const deletePortfolioById = async (req, res, next ) => {
  console.log("deletePortfolioById");
  const portfolioId = req.params.uid;

  try {
    portfolio = await Portfolio.findById(portfolioId);
  } catch (err) {
    const error = new HttpError('could not delete portfolio', 500);
    return next(error);
  }

  try {
    await Portfolio.remove();
  } catch (err) {
    const error = new HttpError('could not delete portfolio', 500);
    return next(error);
  }

  res.status(200).json({ message: 'Deleted Portfolio.'});
};

exports.getPortfolioById = getPortfolioById;
exports.createPortfolio = createdPortfolio;
exports.updatePortfolioById = updatePortfolioById;
exports.deletePortfolioStocks = deletePortfolioById;