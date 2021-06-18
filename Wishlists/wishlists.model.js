const mongoose = require("mongoose")

const { Schema } = mongoose;

const wishlistSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  products: [{
    _id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }
  }]
})

const Wishlist = mongoose.model('Wishlist', wishlistSchema)

module.exports = { Wishlist }