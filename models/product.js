const mongoose = require('mongoose');

const product = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    image: String
});

const Product = mongoose.model('products', product);

module.exports = Product