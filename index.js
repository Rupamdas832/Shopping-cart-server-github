const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express()
app.use(cors())
app.use(bodyParser.json())

const mySecret = process.env['Port']

const {initializeDBconnection} = require("./Database/DBconnect.js")
initializeDBconnection()

const {authVerify} = require("./Users/users.controller")
const { getCartByUserId} = require("./Carts/carts.controller")
const { getWishlistByUserId} = require("./Wishlists/wishlists.controller")

app.get("/", (req,res) => {
  res.json({success: true, message:"Working fine"})
})

const usersRouter = require("./Users/users.router.js")
app.use("/", usersRouter)

const productsRouter = require("./Products/products.router.js")
app.use("/products", productsRouter)

app.use(authVerify)

const cartsRouter = require("./Carts/carts.router.js")
app.use("/cart", getCartByUserId, cartsRouter)

const wishlistsRouter = require("./Wishlists/wishlists.router.js")
app.use("/wishlist", getWishlistByUserId, wishlistsRouter)


app.listen(mySecret, () => {
  console.log("SERVER IS running")
})