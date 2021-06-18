const express = require("express")
const router = express.Router()

const { getWishlist,updateProductToWishlist, removeProductFromWishlist } = require("./wishlists.controller.js")

router.route("/")
.get(getWishlist)
.post(updateProductToWishlist)
.delete(removeProductFromWishlist)

module.exports = router