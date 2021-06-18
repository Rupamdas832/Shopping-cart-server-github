const mongoose = require("mongoose")

const { Schema } = mongoose;

const cartSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  products: [{
    _id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, quantity: { type: Number }
  }]
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = { Cart }