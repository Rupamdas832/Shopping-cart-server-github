const express = require("express")
const router = express.Router()

const { loginUserWithCredentials, signupUserWithEmailAndPassword, userAuthentication, authVerify,addUserPaymentCard, addAddress, removeUserPaymentCard,removeAddress } = require("./users.controller.js")

router.route("/signup").post(signupUserWithEmailAndPassword)

router.route("/login").post(loginUserWithCredentials)

router.route("/user").get(authVerify, userAuthentication)

router.route("/user/paymentCard")
  .post(authVerify, addUserPaymentCard)
  .delete(authVerify, removeUserPaymentCard)

router.route("/user/address")
  .post(authVerify, addAddress)
  .delete(authVerify, removeAddress)

module.exports = router;