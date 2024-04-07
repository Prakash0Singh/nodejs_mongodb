const path = require('path');
const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const mongoConnect = require('./util/database');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const User = require('./models/user');
const { deleteModel } = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

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

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
    User.findOne()
        .then(user => {
            if (!user) {
                const user = new User({
                    name: 'prakash',
                    email: 'prakash@gmail.com',
                    cart: {
                        items: []
                    }
                })
                user.save()
            }
        })
    app.listen(3000);
});

