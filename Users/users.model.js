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
  paymentCards: [{
    cardType: String,
    cardNumber: Number,
    ownerName: String,
    validMonth: Number,
    validYear: Number
  }],
  address: [{
    name: String,
    address: String,
    pincode: Number,
    mobile: Number,
    city: String,
    state: String
  }]
},{
  timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = {User}