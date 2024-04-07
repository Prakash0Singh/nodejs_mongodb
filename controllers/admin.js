const Product = require('../models/product');

exports.postAddProduct = (req, res, next) => {

  const { title, imageUrl, price, description } = req.body;
  Product.create({ title: title, image: imageUrl, price: price, description: description, userid: req.user })
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
  Product.find()
    .select('title price image')
    // .populate('userid', 'name')
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

exports.postEditProduct = (req, res, next) => {
  const _id = req.params.productId;
  const { title, imageUrl, price, description } = req.body;

  Product.findByIdAndUpdate({ _id }, {
    title: title,
    image: imageUrl,
    price: price,
    description: description
  })
    .then((updated) => {
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
  Product.deleteOne({ _id: prodId })
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
