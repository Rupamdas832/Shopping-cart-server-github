const { Product } = require("./products.model.js")

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({})
    if (!products) {
      res.status(404).json({ success: false, message: "No products found. Sorry!" })
    }
    res.status(200).json({ success: true, products: products })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Couldn't retrieve data. Sorry!" })
  }
}

const addProduct = async (req, res) => {
  const {name,price,img,desc,quantity,rating,discount,inStock,isPrimeChoice,category} = req.body;

  try {
    const newProduct = new Product({
          name,
          price,
          img,
          desc,
          quantity,
          rating,
          discount,
          inStock,
          isPrimeChoice,
          category
        }) 
    const saveProduct = await newProduct.save()
    res.status(201).json({ success: true, category: saveProduct })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Couldn't save product. Sorry!" })
  }
}

module.exports = { getAllProducts, addProduct }