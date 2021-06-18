const { Wishlist } = require("./wishlists.model.js")
const { User } = require("../Users/users.model")

const secretKey = process.env['TokenSecretKey']

const getWishlistByUserId = async (req, res, next) => {
  const { userId } = req
  try {
    const findUser = await User.findById(userId)

    if (!findUser) {
      return res.status(400).json({ success: false, message: "User couldn't be found. Try again" })
    }
    let wishlist = await Wishlist.findOne({ userId: userId });

    if (!wishlist) {
      wishlist = new Wishlist({
        userId,
        products: []
      });
      wishlist = await wishlist.save();
    }
    req.wishlist = wishlist;
    next();
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Unable to retrive user's wishlist" })
  }
}

const getWishlist = async (req, res) => {
  const { wishlist } = req
  try {
    res.status(200).json({ success: true, wishlist });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Something went wrong" })
  }
}

const updateProductToWishlist = async (req, res) => {
  let { wishlist } = req;
  const { _id } = req.body

  try {
    const foundProduct = wishlist.products.find(item => item._id == _id)
    if(foundProduct){
      res.status(400).json({success: false, message: "Product already wishlisted"})
    }else {
      wishlist.products.push({ _id})
    }
    wishlist = await wishlist.save()
    res.status(201).json({ success: true, wishlist })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Couldn't be updated. Sorry!", error })
  }
}

const removeProductFromWishlist = async (req, res) => {
  let { wishlist } = req;
  const { _id } = req.body

  try {
    wishlist.products = wishlist.products.filter(item => item._id != _id)
    wishlist = await wishlist.save()
    res.status(200).json({ success: true, wishlist })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Couldn't remove Product", error })
  }
}

module.exports = { getWishlist, getWishlistByUserId, updateProductToWishlist, removeProductFromWishlist }