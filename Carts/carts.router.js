const express = require("express")
const router = express.Router()

const { getCart, updateProductToCart, removeOneQuantityFromCart,removeEntireProductFromCart,emptyCart } = require("./carts.controller.js")

router.route("/")
.get(getCart)
.post(updateProductToCart)
.delete(removeEntireProductFromCart)

router.route("/checkout").delete(emptyCart)
router.route("/:productId").delete(removeOneQuantityFromCart)



module.exports = router