const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.find({})
    .then((product) => {
      res.status(200).send(
        {
          status: true,
          data: product,
          message: 'successfully get all data'
        });
    })
    .catch((err) => {
      res.status(200).send(
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
      res.status(200).send(
        {
          status: true,
          data: product,
          message: 'successfully get all data'
        });
    })
    .catch((err) => {
      res.status(200).send(
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
      res.status(200).send(
        {
          status: false,
          message: err
        }
      )
      console.log(err)
    })
}

exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then((cart) => {
      return cart.getProducts()
        .then(product => {
          res.status(200).send(
            {
              status: true,
              data: product,
              message: 'successfully get cartdata'
            });
        })
        .catch(err => {
          res.status(200).send(
            {
              status: false,
              message: err
            }
          )
          console.log(err)
        })
    })
    .catch(error => {
      console.log(error)
    })
};

exports.postCart = (req, res, next) => {
  const productId = req.params.productId;
  let newQuantity = 1
  let fetchCart;
  req.user.getCart()
    .then(cart => {
      fetchCart = cart
      return cart.getProducts({ where: { id: productId } })
    })
    .then(product => {
      let produ
      if (product.length > 0) {
        produ = product[0]
      }

      if (produ) {
        const oldquntity = produ.cartItem.quantity;
        newQuantity = oldquntity + 1;
        return product;
      }
      return Product.findByPk(productId)
    })
    .then(product => {
      return fetchCart.addProduct(product, { through: { quantity: newQuantity } })
    })
    .then(product => {
      res.status(200).send(
        {
          status: true,
          data: product,
          message: 'successfully get cartdata'
        });
    })
    .catch(err => {
      res.status(200).send(
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
  req.user.getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: productId } })
    })
    .then(products => {
      const product = products[0]
      return product.cartItem.destroy()
    })
    .then(result => {
      res.status(200).send(
        {
          status: true,
          data: result,
          message: 'successfully removed from cart'
        });
    })
    .catch(err => {
      res.status(200).send(
        {
          status: false,
          message: err
        }
      )
      console.log(err)
    })
}

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user.getCart()
    .then(cart => {
      fetchedCart = cart
      return cart.getProducts()
    })
    .then(products => {
      return req.user.createOrder()
        .then(order => {
          return order.addProducts(products.map(data => { data.orderItem = { quantity: data.cartItem.quantity }; return data }))
        })
        .catch(err => { console.log(err) })
    })
    .then(result => {
      return fetchedCart.setProducts(null)

    })
    .then(result => {
      res.status(200).send(
        {
          status: true,
          data: result,
          message: 'successfully added to orderlist'
        });
    })
    .catch(err => {
      res.status(200).send(
        {
          status: false,
          message: err
        }
      )
      console.log(err)
    })
}

exports.getOrders = (req, res, next) => {
  req.user.getOrders({ include: ['products'] })
    .then(order => {
      res.status(200).send(
        {
          status: true,
          data: order,
          message: 'successfully get orders-list'
        });
    })
    .catch(err => {
      res.status(200).send(
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
