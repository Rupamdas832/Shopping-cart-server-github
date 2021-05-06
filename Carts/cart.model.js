const mongoose = require("mongoose")

const {Schema} = mongoose;

const cartSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  products: [{productId: String, quantity: Number}]
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = {Cart}