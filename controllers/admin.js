const Product = require('../models/product');

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  Product.create({ title: title, image: imageUrl, price: price, description: description })
    .then(() => {
      res.status(200).send({
        status: true,
        message: 'Data added successfully.',
      })
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

exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
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

exports.postEditProduct = (req, res, next) => {
  const prodId = req.params.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  Product.findByPk(prodId)
    .then((product) => {
      product.title = title,
        product.image = imageUrl,
        product.price = price,
        product.description = description;
      return product.save();
    })
    .then((updated) => {
      // res.redirect('/');
      res.status(200).send({
        status: true,
        data: updated,
        message: 'Data updated successfully.',
      })
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

}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.destroy({
    where: {
      id: prodId
    },
  })
    .then((updated) => {
      res.status(200).send({
        status: true,
        data: updated,
        message: 'Data deleted successfully.',
      })
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

}
