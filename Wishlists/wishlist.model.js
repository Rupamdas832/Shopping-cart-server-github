const mongoose = require("mongoose")

const {Schema} = mongoose;

const wishlistSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  products: [{productId: String}]
})

const Wishlist = mongoose.model('Wishlist', wishlistSchema)

module.exports = {Wishlist}