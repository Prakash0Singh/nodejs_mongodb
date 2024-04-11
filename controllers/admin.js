const Product = require('../models/product');

exports.postAddProduct = (req, res, next) => {

  const { title, price, description } = req.body;
  let image = req.file.path;
  console.log(req.userId)
  image = image.replace("images\\", "http://localhost:3000/images/")
  if (!req.file) {
    res.status(200).json(
      {
        status: false,
        message: 'File not uploaded'
      }
    )
    console.log(err)
  }
  Product.create({ title: title, image: image, price: price, description: description, userid: req.userId })
    .then(() => {
      res.status(201).json({
        status: true,
        message: 'Data added successfully.',
      })
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

exports.getProducts = (req, res, next) => {
  Product.find()
    .select('title price image')
    // .populate('userid', 'name')
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

exports.getEditProduct = (req, res, next) => {
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
      res.status(200).json({
        status: true,
        data: updated,
        message: 'Data updated successfully.',
      })
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

}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.deleteOne({ _id: prodId })
    .then((updated) => {
      res.status(200).json({
        status: true,
        data: updated,
        message: 'Data deleted successfully.',
      })
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

}
