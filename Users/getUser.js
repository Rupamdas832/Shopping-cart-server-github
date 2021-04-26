const express = require("express")
const router = express.Router()

const {User} = require("./user.model.js")

router.route("/")
  .post(async(req,res) => {
    const {userId} = req.body

    try{
        const findUser = await User.findById(userId)
        if(findUser){
            res.status(200).json({success: true, user: findUser})
          }
      }catch(error){
        res.status(500).json({success: false, message: "Sorry! user not present in database"})
    }
  })
  

  module.exports = router