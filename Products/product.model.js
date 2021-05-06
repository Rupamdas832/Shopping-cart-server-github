const mongoose = require("mongoose")

const {Schema} = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  inStock: {
    type: Boolean,
    required: true
  },
  isPrimeChoice: {
    type: Boolean,
    required: true
  },
  category: {
    type: String,
    enum: ["AAA", "SPORTS", "RPG", "COMBAT"],
    required: true,
  }
})

const Product = mongoose.model('Product', productSchema)

module.exports = {Product}