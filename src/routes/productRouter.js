const express = require('express');
const ProductModel = require('../models/ProductModel');

const productRouter = express.Router();

const cleanProduct = (productDocument) => {
  return {
    id: productDocument._id,
    title: productDocument.title,    
    description: productDocument.description,
    brand: productDocument.brand,
    price: productDocument.price,
    image: productDocument.image,
  }
}

productRouter.post('/create-product', async (req, res, next) => {
  try {
    // Grab the data from the network request
    console.log('body: ', req.body);
    const { productData } = req.body;
  
    const productDocument = new ProductModel(productData);
  
    // store it in the database
    await productDocument.save();
  
    // return it to the front end after.
    res.send({ product: productDocument })
  } catch(error){
    next(error);
  }
});

productRouter.get('/get-products', async (req, res, next) => {
  try {
    // Grab the data from the network request
    const products = await ProductModel.find();
  
    // return it to the front end after.
    res.send({ products: products.map(cleanProduct) })
  } catch(error){
    next(error);
  }
});

module.exports = productRouter;