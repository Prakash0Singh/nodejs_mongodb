const path = require('path');
const express = require('express');
const isAuth = require('../middleware/verify_auth')

const { getProducts, postAddProduct, getEditProduct, postEditProduct, postDeleteProduct } = require('../controllers/admin');

const router = express.Router();

router.get('/products', getProducts);

router.post('/add-product', isAuth, postAddProduct);

router.get('/products/:productId', getEditProduct);

router.post('/update-product/:productId', postEditProduct);

router.post('/delete-product/:productId', postDeleteProduct);

module.exports = router;
