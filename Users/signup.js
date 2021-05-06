const express = require("express")
const router = express.Router()
const {v4} = require("uuid")

const {User} = require("./user.model.js")
const {Cart} = require("../Carts/cart.model.js")
const {Wishlist} = require("../Wishlists/wishlist.model.js")

router.route("/")
  .post(async (req,res) => {
    const {name, email, password} = req.body;
    
    try{

          const newCart = new Cart({
            _id: v4(),
            products: []
          })

          const newWishlist = new Wishlist({
            _id: v4(),
            products:[]
          })
          const newUser = new User({
            name: name, 
            email: email, 
            password: password,
            cartId: newCart._id,
            wishlistId: newWishlist._id
            })

          const saveUser = await newUser.save()
          const saveCart = await newCart.save()
          const saveWishlist = await newWishlist.save()

          res.status(201).json({success: true, user: saveUser})
        
    }catch(error){
      res.status(500).json({success: false, message: "Sorry! couldn't signup. Retry...", error})
    }
  })
  

  module.exports = router