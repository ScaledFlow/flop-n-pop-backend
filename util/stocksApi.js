console.log('stocksApi.js');

const axios = require('axios');


const finnhub = require("finnhub");
const request = require("request");
const price = require('crypto-price');

// const axios = require('axios');

const HttpError = require('../models/http-error');
const { body } = require('express-validator');

// Initialize Finnhub
const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = "bt01m7n48v6ouqftkos0"; // Replace this
token_key = "bt01m7n48v6ouqftkos0";



let data;

// async function getStockQuote(ticker) {
//   console.log('ticker from request: ' + ticker)
//   const response = await axios.get(
//   `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${token_key}`, { json: true }, (err, res, body));
//     if (err) { return console.log(err); }
//   // console.log("made it to getStockQuotes");
//   // console.log(ticker)

//   if (!data || data.status === 'ZERO_RESULTS') {
//     console.log("error thrown here");
//     const error = new HttpError('threw and error', 422);
//     throw error;
//   }

//   console.log(response.data)

//   return response.data;
// }
let stockPrice;
async function getStockQuote(ticker) {
  console.log('getStockQuote Ticker: ' + ticker)
  const zzz = request(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${token_key}`, { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log('retrieved stock price: ' + body.c);
  stockPrice = body.c;
  return stockPrice;
  });

  return stockPrice;
}

module.exports = getStockQuote;