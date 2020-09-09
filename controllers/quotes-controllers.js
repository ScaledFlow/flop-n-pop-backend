console.log("quotes-controllers");

const finnhub = require("finnhub");
const request = require("request");
const price = require('crypto-price');

const { v4: uuidv4 } = require('uuid');
const { validationResults } = require('express-validator');

const HttpError = require('../models/http-error');
const getStockQuote = require('../util/stocksApi.js');

// Initialize Finnhub
const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = "bt01m7n48v6ouqftkos0"; // Replace this
token_key = "bt01m7n48v6ouqftkos0";

const finnhubClient = new finnhub.DefaultApi();

const getStockLookUpByTicker = (req, res, next) => {
  console.log('getStockLookUpByTicker');
  const tickerId = req.params.tid.toUpperCase();
  let stockPrice;
  const zzz = request(`https://finnhub.io/api/v1/quote?symbol=${tickerId}&token=${token_key}`, { json: true }, (err, res2, body) => {
    if (err) { return console.log(err); }
    console.log(body.c);
    stockPrice = body.c;
    res.json({stock: stockPrice}); 
});
};

// const getStockLookUpByTicker = async (req, res, next) => {
//   console.log("getStockLookUpByTicker");
//   const tickerId = req.params.tid.toUpperCase();
//   console.log(tickerId);
//   let stockPrice;
//   try {
//     stockPrice = getStockQuote(tickerId);
//     console.log('get this stock price: ' + stockPrice);
//   } catch (error) {
//     return next(error);
//   }
//   res.json({stock: stockPrice}); 
// };

exports.getStockLookUpByTicker = getStockLookUpByTicker;