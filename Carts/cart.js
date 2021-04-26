const express = require("express")

const router = express.Router()

const {Cart} = require("./cart.model.js")

router.route("/")
  router.param("cartId", async (req,res,next,cartId) => {
    try{
      const findCart = await Cart.findById(cartId)
      if(!findCart){
        return res.status(400).json({success: false, message: "Cart not found with defined userId"})
      }
      req.cart = findCart
      next();
    }
    catch(error){
      res.status(400).json({success: false, message: "Couldn't retrieve Cart"})
    }
  })
  router.param("productId", async (req,res,next,productId) => {
    let {cart} = req
    try{
       const findProduct = cart.products.find(item => item.productId === productId)
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



  router.route("/:cartId")
    .get((req,res) => {
      const {cart} = req

      res.status(200).json({success: true, products: cart.products})
    })
    .post(async (req,res) => {
      let {cart} = req
      const {productId, quantity} = req.body
      try{
        cart.products.push({productId: productId, quantity: quantity})
      
        cart = await cart.save()
        res.status(201).json({success: true, cart})   
      }
      catch(error){
        res.status(400).json({success:false, message: "Couldn't be updated. Sorry!", error})
      }
    })
  router.route("/:cartId/:productId")
    .delete(async (req,res) => {
      let {cart,productId} = req

      try{
          cart.products = cart.products.filter(item => item.productId !== productId)
          cart = await cart.save()
          res.status(202).json({success: true, cart})
      }catch(error){
        res.status(400).json({success: false, message: "Couldn't remove product", error})
      }
      
    })

  module.exports = router