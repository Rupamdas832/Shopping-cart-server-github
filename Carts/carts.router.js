const express = require("express")
const router = express.Router()

const { getCart, updateProductToCart, removeOneQuantityFromCart,removeEntireProductFromCart,checkoutCartItems,updateProductStatus } = require("./carts.controller.js")

router.route("/")
.get(getCart)
.post(updateProductToCart)
.delete(removeEntireProductFromCart)

router.route("/checkout").delete(checkoutCartItems)

router.route("/:productId")
.post(updateProductStatus)
.delete(removeOneQuantityFromCart)



module.exports = router