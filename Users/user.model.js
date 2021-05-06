const mongoose = require('mongoose')

const {Schema} = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: [true, 'Email already present.']
    },
  password: {
    type: String,
    required: true
    },
  cartId: {
    type: String,
    required: true
  },
  wishlistId: {
    type: String,
    required: true
  }
})

const User = mongoose.model('User', userSchema)

module.exports = {User}