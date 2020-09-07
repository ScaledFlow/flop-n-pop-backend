console.log("quotes-controllers");
const { v4: uuidv4 } = require('uuid');
const { validationResults } = require('express-validator');

const HttpError = require('../models/http-error');


const getStockLookUpByTicker = (req, res, next) => {
  console.log("getStockLookUpByTicker");
  const tickerId = req.params.tid;
  console.log(tickerId);

  if (!tickerId) {
    return res.status('404').json({message: 'Ticker not received'})
  }

  res.json({stock: tickerId});
};

exports.getStockLookUpByTicker = getStockLookUpByTicker;