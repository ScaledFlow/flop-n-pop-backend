console.log('models/portfolio.js');

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const portfolioSchema = new Schema ({
  email: { type: String, required: true },
  name: {
    first: { type: String},
    last: { type: String }
  },
  portfolios: [
    {
      portfolio: { type: String },
      ticker: {type: String}
    }
  ]
})

module.exports = mongoose.model('Portfolio', portfolioSchema );
