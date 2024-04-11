const path = require('path');
const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoConnect = require('./util/database');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const User = require('./models/user');
const session = require('express-session')
const app = express();
const fs = require('fs')


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'images');
//     },
//     filename: function (req, file, cb) {
//         cb(null, uuidv4())
//     }
// });

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
//         cb(null, true)
//     }
//     else {
//         cb(null, false)
//     }
// }
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});


app.use(cors())
app.use(bodyParser.json())
app.use(multer({ storage: storage }).single('image'));

app.use('/images', express.static(path.join(__dirname, 'images')));

// app.use(session({ secret: 'secretkey', resave: false, saveUninitialized: false }))
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', "*");
//     res.setHeader('Access-Control-Allow-Methods', "GET,POST,PUT,PATCH,DELETE");
//     res.setHeader('Access-Control-Allow-Headers', "Content-Type,Authorization");
//     next()
// })
app.use((req, res, next) => {
    User.findById('661130473c1f4ea65c80e99d')
        .then(user => {
            req.user = user
            next();
        })
        .catch(err => {
            console.log(err)
        })
})

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use(shopRoutes);



mongoConnect(() => {
    app.listen(3000);
});

