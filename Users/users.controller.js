const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { User } = require("./users.model.js")

const secretKey = process.env['TokenSecretKey']

const loginUserWithCredentials = async (req, res) => {
  const { email, password } = req.body;

  try {
    const findUser = await User.findOne({ email: email })

    if (!findUser) {
      return res.status(400).json({ success: false, message: "User email not found" })
    } if (bcrypt.compareSync(password, findUser.password)) {

      const token = jwt.sign({ userId: findUser._id }, secretKey, { expiresIn: '24h' })
      findUser.password = undefined
      res.status(200).json({ success: true, user: findUser, token: token })
    }
    else res.status(401).json({ success: false, message: "Sorry! Password is wrong" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Sorry! Something went wrong" })
  }
}

const signupUserWithEmailAndPassword = async (req, res) => {
  const { name, email, password } = req.body;

  try {

    const findEmail = await User.findOne({ email: email })

    if (findEmail) {
      return res.status(400).json({ success: false, message: "Email already present.Try with different email Id" })
    }
    const newUser = new User({
      name: name,
      email: email,
      password: bcrypt.hashSync(password, 8)
    })

    const saveUser = await newUser.save()

    const token = jwt.sign({ userId: saveUser._id }, secretKey, { expiresIn: '24h' })

    saveUser.password = undefined
    res.status(201).json({ success: true, user: saveUser, token: token })

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Sorry! couldn't signup. Retry...", error })
  }
}

const userAuthentication = async (req, res) => {
  const { userId } = req

  try {
    const foundUser = await User.findById(userId)

    if (!foundUser) {
      return res.status(400).json({ success: false, message: "User Email not found" })
    } else {
      foundUser.password = undefined
      res.status(200).json({ success: true, user: foundUser })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Sorry! Something went wrong" })
  }
}

const authVerify = (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(token, secretKey)
    req.userId = decoded.userId
    return next();
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: "Unauthorised access, please add the token" })
  }
}

const addUserPaymentCard = async(req,res) => {
  const {cardType, cardNumber, ownerName, validMonth, validYear} = req.body
  const {userId} = req
  try{
    let foundUser = await User.findById(userId)
    if(!foundUser){
      return res.status(404).json({success: false, message: "User not found."})
    }
    foundUser.paymentCards.push({cardType,cardNumber,ownerName,validMonth,validYear})
    await foundUser.save()
    res.status(201).json({success: true, paymentCards: foundUser.paymentCards})
  }catch(error){
    console.log(error)
    res.status(500).json({success: false, message: "Something went wrong"})
  }
}

const removeUserPaymentCard = async (req,res) => {
  const {paymentCardId} = req.body
  const {userId} = req
  try{
    let foundUser = await User.findById(userId)
    if(!foundUser){
      return res.status(404).json({success: false, message: "User not found."})
    }
    const foundCard = foundUser.paymentCards.find(card => card._id == paymentCardId)
    if(!foundCard){
      return res.status(404).json({success: false, message: "Payment card not found."})
    }
    foundUser.paymentCards = foundUser.paymentCards.filter(card => card._id != paymentCardId)
    await foundUser.save()
    res.status(200).json({success: true, paymentCards: foundUser.paymentCards})
  }catch(error){
    console.log(error)
    res.status(500).json({success: false, message: "Something went wrong"})
  }
}

const addAddress = async(req,res) => {
  const {name, address, pincode, mobile, city,state} = req.body
  const {userId} = req
  try{
    let foundUser = await User.findById(userId)
    if(!foundUser){
      return res.status(404).json({success: false, message: "User not found."})
    }
    foundUser.address.push({name,address,pincode,mobile,city,state})
    await foundUser.save()
    res.status(201).json({success: true, address: foundUser.address})
  }catch(error){
    console.log(error)
    res.status(500).json({success: false, message: "Something went wrong"})
  }
}
const removeAddress = async (req,res) => {
  const {addressId} = req.body
  const {userId} = req
  try{
    let foundUser = await User.findById(userId)
    if(!foundUser){
      return res.status(404).json({success: false, message: "User not found."})
    }
    const foundAddress = foundUser.address.find(eachAddress => eachAddress._id == addressId)
    if(!foundAddress){
      return res.status(404).json({success: false, message: "User address not found."})
    }
    foundUser.address = foundUser.address.filter(eachAddress => eachAddress._id != addressId)
    await foundUser.save()
    res.status(200).json({success: true, address: foundUser.address})
  }catch(error){
    console.log(error)
    res.status(500).json({success: false, message: "Something went wrong"})
  }
}

module.exports = { loginUserWithCredentials, signupUserWithEmailAndPassword, userAuthentication, authVerify,addUserPaymentCard,addAddress,removeUserPaymentCard,removeAddress }