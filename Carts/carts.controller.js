const { Cart } = require("./carts.model.js")
const { User } = require("../Users/users.model")

const secretKey = process.env['TokenSecretKey']

const getCartByUserId = async (req, res, next) => {
  const { userId } = req
  try {
    const findUser = await User.findById(userId)

    if (!findUser) {
      return res.status(400).json({ success: false, message: "User couldn't be found. Try again" })
    }
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        products: []
      });
      cart = await cart.save();
    }
    req.cart = cart;
    next();
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Unable to retrive user's cart" })
  }
}

const getCart = async (req, res) => {
  const { cart } = req
  try {
    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Unable to retrive the Cart" })
  }
}

const updateProductToCart = async (req, res) => {
  let { cart } = req;
  const { _id } = req.body

  try {
    const foundProduct = cart.products.find(item => item._id == _id)
    if(foundProduct){
      cart.products = cart.products.map(item => {
        if (item._id == _id) {
          item.quantity = item.quantity + 1
        }
      return item
    })
    }else {
      cart.products.push({ _id, quantity: 1 })
    }
    cart = await cart.save()
    res.status(201).json({ success: true, cart })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Couldn't be updated. Sorry!", error })
  }
}

const removeOneQuantityFromCart = async (req, res) => {
  let { cart } = req;
  const { productId} = req.params

  try {
    const foundProduct = cart.products.find(item => item._id == productId)
    if(foundProduct.quantity > 1){
      cart.products = cart.products.map(item => {
        if (item._id == productId) {
          item.quantity = item.quantity - 1
        }
      return item
    })
    }
    cart = await cart.save()
    res.status(200).json({ success: true, cart })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Couldn't remove Product", error })
  }
}

const removeEntireProductFromCart = async (req, res) => {
  let { cart } = req;
  const { _id } = req.body

  try {
    cart.products = cart.products.filter(item => item._id != _id)
    cart = await cart.save()
    res.status(200).json({ success: true, cart })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Couldn't remove Product", error })
  }
}

const emptyCart = async (req, res) => {
  let { cart } = req;

  try {
    cart.products = []
    cart = await cart.save()
    res.status(200).json({ success: true, cart })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Couldn't remove Product", error })
  }
}

module.exports = { getCart, getCartByUserId, updateProductToCart, removeOneQuantityFromCart, removeEntireProductFromCart,emptyCart }