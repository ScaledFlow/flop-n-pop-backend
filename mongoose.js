console.log('mongoose.js');

const mongoose = require('mongoose');

const Product = require('./models/product');

mongoose.connect(
  'mongodb+srv://admin:dbPassAtlas8453@cluster0.76p3z.mongodb.net/stock_test?retryWrites=true&w=majority',  {useUnifiedTopology: true, useNewUrlParser: true }
  ).then(() => {
    console.log('Connected to database!')
  }).catch(() => {
    console.log('Connection to database failed!')
});

const createProduct = async (req, res, next ) => {
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price
  });
  const result = await createdProduct.save();

  res.json(result);
}

const getProducts = async (req, res, next ) => {
  const products = await Product.find().exec();
  res.json(products);

}

exports.createProduct = createProduct;
exports.getProducts = getProducts;