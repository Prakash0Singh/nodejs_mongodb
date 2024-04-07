const mongoose = require('mongoose');
const Schema = mongoose.Schema

const user = new Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    cart: {
        items: [
            {
                productID: { type: Schema.Types.ObjectId, ref: 'products', required: true },
                quantity: { type: Number, required: true }
            }
        ]
    }
})

user.methods.addToCart = function (product) {
    const productIndex = this.cart.items.findIndex(cp => {
        return cp.productID.toString() === product._id.toString()
    })
    let newQunantity = 1;
    const updateProductIndex = [...this.cart.items];

    if (productIndex >= 0) {
        newQunantity = this.cart.items[productIndex].quantity + 1;
        updateProductIndex[productIndex].quantity = newQunantity
    } else {
        updateProductIndex.push({
            productID: product._id,
            quantity: newQunantity
        })
    }
    const updatedCart = {
        items: updateProductIndex
    }
    this.cart = updatedCart;
    return this.save();
}

user.methods.removeFromCart = function (productID) {
    const updatedCartItems = this.cart.items.filter(item => {
        return item.productID.toString() !== productID.toString()
    })
    this.cart.items = updatedCartItems;
    return this.save();
}

user.methods.clearCart = function () {
    this.cart = { items: [] }
    return this.save();
}

const User = mongoose.model('users', user);
module.exports = User