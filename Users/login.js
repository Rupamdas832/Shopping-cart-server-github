const express = require("express")
const router = express.Router()

const {User} = require("./user.model.js")

router.route("/")
  .post(async(req,res) => {
      const {email, password} = req.body;

    try{
        const findUser = await User.find({email: email})
        
        if(findUser){
          if(findUser[0].password == password){
            res.status(200).json({success: true, user: findUser[0]})
          }
          else res.status(401).json({success: false, message: "Sorry! Password is wrong"})
        }
      }catch(error){
        res.status(401).json({success: false, message: "Sorry! Email entered is not present in database"})
    }
  })
  

  module.exports = router