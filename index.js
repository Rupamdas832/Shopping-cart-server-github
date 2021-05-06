const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express()
app.use(cors())
app.use(bodyParser.json())

const mySecret = process.env['Port']

const {initializeDBconnection} = require("./Database/DBconnect.js")
initializeDBconnection()

const products = require("./Products/products.js")
app.use("/products", products)

const loginUser = require("./Users/login.js")
app.use("/login", loginUser)

const getUserById = require("./Users/getUser.js")
app.use("/user", getUserById)

const signupUser = require("./Users/signup.js")
app.use("/signup", signupUser)

const cart = require("./Carts/cart.js")
app.use("/cart", cart)

const wishlist = require("./Wishlists/wishlist.js")
app.use("/wishlist", wishlist)

app.get("/", (req,res) => {
  res.json({success: true, message:"Working fine"})
})


app.listen(mySecret, () => {
  console.log("SERVER IS running")
})