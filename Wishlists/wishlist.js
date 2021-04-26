const express = require("express")

const router = express.Router()

const {Wishlist} = require("./wishlist.model.js")


router.route("/")
  router.param("wishlistId", async (req,res,next,wishlistId) => {
    try{
      const findWishlist = await Wishlist.findById(wishlistId)
      if(!findWishlist){
        return res.status(400).json({success: false, message: "Wishlist not found with defined userId"})
      }
      req.wishlist = findWishlist
      next();
    }
    catch(error){
      res.status(400).json({success: false, message: "Couldn't retrieve Wishlist"})
    }
  })
  router.param("productId", async (req,res,next,productId) => {
    let {wishlist} = req
    try{
       const findProduct = wishlist.products.find(item => item.productId === productId)
      if(!findProduct){
        return res.status(400).json({success: false, message: "Product not found with defined userId"})
      }
      
      req.productId = productId
      next();
    }
    catch(error){
      res.status(400).json({success: false, message: "Couldn't retrieve Product"})
    }
  })



  router.route("/:wishlistId")
    .get((req,res) => {
      const {wishlist} = req

      res.status(200).json({success: true, products: wishlist.products})
    })
    .post(async (req,res) => {
      let {wishlist} = req
      const {productId, quantity} = req.body
      try{
        wishlist.products.push({productId: productId, quantity: quantity})
      
        wishlist = await wishlist.save()
        res.status(201).json({success: true, wishlist})   
      }
      catch(error){
        res.status(400).json({success:false, message: "Couldn't be updated. Sorry!", error})
      }
    })
  router.route("/:wishlistId/:productId")
    .delete(async (req,res) => {
      let {wishlist,productId} = req

      try{
          wishlist.products = wishlist.products.filter(item => item.productId !== productId)
          wishlist = await wishlist.save()
          res.status(202).json({success: true, wishlist})
      }catch(error){
        res.status(400).json({success: false, message: "Couldn't remove product", error})
      }
      
    })

  module.exports = router