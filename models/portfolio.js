console.log('models/portfolio.js');

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const portfolioSchema = new Schema ({

  portfolioName: { type: String, required: true },
  assetType: { type: String, default: "stock" },
  scanAlert: { type: Boolean, default: false },
  assets: [ { type: String } ],
  creator: { type:mongoose.Types.ObjectId, required: true, ref: 'User' }
})

module.exports = mongoose.model('Portfolio', portfolioSchema );

