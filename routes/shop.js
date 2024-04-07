const path = require('path');

const express = require('express');

const { getIndex, getProducts, getProduct, getCart, getOrders, getCheckout, postCart, postRemoveCart, postOrder } = require('../controllers/shop');

const router = express.Router();

// router.get('/', getIndex);

router.get('/products', getProducts);

router.get('/products/:productId', getProduct);

router.get('/cart', getCart);

router.post('/add-cart/:productId', postCart)

router.post('/remove-cart/:productId', postRemoveCart)

router.post('/create-order', postOrder)

router.get('/orders', getOrders);

// router.get('/checkout', getCheckout);

module.exports = router;
