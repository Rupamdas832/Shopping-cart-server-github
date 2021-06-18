const express = require("express")
const router = express.Router()

const { getAllProducts, addProduct  } = require("./products.controller.js")

router.route("/").get(getAllProducts)

router.route("/").post(addProduct)


module.exports = router