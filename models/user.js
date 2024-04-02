const mongoose = require('mongoose');


const user = new mongoose.Schema({
    email: String,
    name: String
})

const User = mongoose.model('users', user);
module.exports = User