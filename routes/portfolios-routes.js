console.log("portfolios-routes");

const express = require('express');
const { check } = require('express-validator');

const portfoliosControllers = require('../controllers/portfolios-controllers');

const router = express.Router();

// GET
router.get('/:id', portfoliosControllers.getPortfolioById );

// POST 
router.post('/', portfoliosControllers.createPortfolio);

// PATCH
router.patch('/:pid', portfoliosControllers.updatePortfolioById);

// DELETE
router.delete('/:uid', portfoliosControllers.deletePortfolioStocks), 


module.exports = router;