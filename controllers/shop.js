const Product = require('../models/product');
const Order = require('../models/order')

exports.getProducts = (req, res, next) => {
  Product.find({})
    .then((product) => {
      res.status(200).json(
        {
          status: true,
          data: product,
          message: 'successfully get all data'
        });
    })
    .catch((err) => {
      res.status(200).json(
        {
          status: false,
          message: err
        }
      )
      console.log(err)
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.status(200).json(
        {
          status: true,
          data: product,
          message: 'successfully get all data'
        });
    })
    .catch((err) => {
      res.status(200).json(
        {
          status: false,
          message: err
        }
      )
      console.log(err)
    })

};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(products => {

      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      res.status(200).json(
        {
          status: false,
          message: err
        }
      )
      console.log(err)
    })
}

exports.getCart = (req, res, next) => {
  req.user.populate('cart.items.productID')
    .then(product => {
      res.status(200).json(
        {
          status: true,
          data: product.cart.items,
          message: 'successfully get cartdata'
        });
    })
    .catch(err => {
      res.status(200).json(
        {
          status: false,
          message: err
        }
      )
      console.log(err)
    })
};

exports.postCart = async (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then(product => {
      return req.user.addToCart(product)
    })
    .then(result => {
      res.status(200).json(
        {
          status: true,
          message: 'successfully added to cart'
        });
    })
    .catch(err => {
      res.status(200).json(
        {
          status: false,
          message: err
        }
      )
      console.log(err)
    })
}

exports.postRemoveCart = (req, res, next) => {
  const productId = req.params.productId;
  req.user.removeFromCart(productId)
    .then(result => {
      res.status(200).json(
        {
          status: true,
          data: result,
          message: 'successfully removed from cart'
        });
    })
    .catch(err => {
      res.status(200).json(
        {
          status: false,
          message: err
        }
      )
      console.log(err)
    })
}

exports.postOrder = (req, res, next) => {
  req.user.populate('cart.items.productID')
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productID._doc } }
      });
      const order = new Order(
        {
          products: products,
          user: { name: req.user.name, userId: req.user }
        })
      return order.save();
    })
    .then(result => {
      return req.user.clearCart()
    })
    .then(data => {
      res.status(200).json(
        {
          status: true,
          message: 'successfully Order cart-items'
        });
    })
    .catch(err => {
      res.status(200).json(
        {
          status: false,
          message: err
        }
      )
      console.log(err)
    })
}

exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then(order => {
      res.status(200).json(
        {
          status: true,
          data: order,
          message: 'successfully get orders-list'
        });
    })
    .catch(err => {
      res.status(200).json(
        {
          status: false,
          message: err
        }
      )
      console.log(err)
    })
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
