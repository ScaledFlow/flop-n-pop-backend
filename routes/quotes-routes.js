console.log("quotes-routes");
const express = require('express');
const { check } = require('express-validator');

const quotesControllers = require('../controllers/quotes-controllers');

const router = express.Router();

router.get('/:tid', quotesControllers.getStockLookUpByTicker);

module.exports = router;