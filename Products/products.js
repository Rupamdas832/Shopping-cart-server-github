const express = require('express')
const router = express.Router();

const {Product} = require("./product.model.js")

router.route("/")
  .get(async(req,res) => {

    try{
      const products = await Product.find({})
      res.status(200).json({success: true, products})
    }catch(error) {
      res.status(401).json({success: false, message: "Products couldn't be retrieved from db"})
    }
    
  })
  .post(async(req,res) => {
    const {name,price,img,desc,quantity,rating,discount,inStock,isPrimeChoice,category} = req.body;

    try{
        const newProduct = new Product({
          name: name,
          price: price,
          img: img,
          desc: desc,
          quantity: quantity,
          rating: rating,
          discount: discount,
          inStock: inStock,
          isPrimeChoice: isPrimeChoice,
          category: category
        }) 

        const saveProduct = await newProduct.save()
        res.status(201).json({success: true, product: saveProduct})
        
      }catch(error){
        res.status(500).json({success: false, message: "Product couldn't be saved to db"})
      }
  })

  module.exports = router