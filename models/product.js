console.log('models/proudcts.js');

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, reequired: true}
});

module.exports = mongoose.model('Product', productSchema);