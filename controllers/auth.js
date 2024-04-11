const User = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.postLogin = (req, res, next) => {
    const { email, password } = req.body
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                res.status(200).json({
                    status: false,
                    message: 'User not exists'
                })
            }
            else {
                bcrypt.compare(password, user.password)
                    .then(result => {
                        if (result) {
                            const token = jwt.sign(
                                { email: user.email, userId: user._id.toString() },
                                'nodesecretkey', { expiresIn: '1h' }
                            );
                            res.status(200).json({
                                status: true,
                                token: token,
                                userId: user._id,
                                message: 'User login Successfully'
                            })
                        }
                        else {
                            res.status(200).json({ status: false, message: 'Incorrect Password' })
                        }
                    })

            }
        })
        .catch(err => {
            console.log(err)
        })

}

exports.postSignup = (req, res, next) => {
    const { email, password, confirm_password, name } = req.body;
    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                res.status(200).json({
                    status: false,
                    message: 'User Already Exists',
                })
            }
            else {
                bcrypt.hash(password, 10)
                    .then(hashedPassword => {
                        const user = new User({
                            name: name,
                            email: email,
                            password: hashedPassword,
                            cart: { items: [] }
                        })
                        user.save()
                    })
                    .then(data => {
                        res.status(200).json({
                            status: true,
                            message: 'User Created Successfully'
                        })
                    })
                    .catch((err) => {
                        res.json({ status: false, message: err })
                        console.log(err)
                    });
            }
        })
        .catch((err) => {
            res.json({ status: false, message: err })
            console.log(err)
        });
}

exports.postLogout = (req, res, next) => {
    // const prodId = req.params.productId;
    // Product.deleteOne({ _id: prodId })
    //   .then((updated) => {
    //     res.status(200).json({
    //       status: true,
    //       data: updated,
    //       message: 'Data deleted successfully.',
    //     })
    //   })
    //   .catch((err) => {
    //     res.status(200).json(
    //       {
    //         status: false,
    //         message: err
    //       }
    //     )
    //     console.log(err)
    //   });

}