console.log("mongo.js");

// http://localhost:3000/products

// {
//   "name": "apple",
//   "price": 0.99 
// }

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://admin:dbPassAtlas8453@cluster0.76p3z.mongodb.net/stock_test?retryWrites=true&w=majority';

const createProduct = async (req, res, next) => {
  console.log("createProduct");
  const newProduct = {
    name: req.body.name,
    price: req.body.price
  };

  console.log(newProduct);

  const client = new MongoClient(url, {useUnifiedTopology: true, useNewUrlParser: true });
 
  let testResult;
 
  try {
    await client.connect();

    const db = await client.db();
    const result = await db.collection('products').insertOne(newProduct);
    console.log(result.ops[0].name);
    testResult = result.ops[0].name;
  } catch (error) {
    return res.json({message: 'Could not store data.'});
  };
  client.close();

  res.json(testResult);
}

// http://localhost:3000/products

const getProducts = async (req, res, next) => {
  console.log("getProduct");
  const client = new MongoClient(url, {useUnifiedTopology: true, useNewUrlParser: true });

  let products;

  try {
    await client.connect();
    const db = await client.db();
    const products = await db.collection('products').find().toArray();
    console.log(products);
  } catch (error) {
    return res.json({message: 'Could not retrieve products.'});
  };
  await client.close();
  console.log(products);
  res.json(products);
}

exports.createProduct = createProduct;
exports.getProducts = getProducts;