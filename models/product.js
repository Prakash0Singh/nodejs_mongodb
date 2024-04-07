const mongoose = require('mongoose');
const Schema = mongoose.Schema
const product = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    userid: { type: Schema.Types.ObjectId, ref: 'users' },
},
    {
        timestamps: true,
    }
);

const Product = mongoose.model('products', product);

module.exports = Product 