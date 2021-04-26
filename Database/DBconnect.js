const mongoose = require("mongoose")

const uri = "mongodb+srv://rupamdas832:9430112253@products-data-cluster.tmatv.mongodb.net/product-inventory?retryWrites=true&w=majority";

const initializeDBconnection = async () => {
  try{
    const response = await mongoose.connect(uri, {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    })
    if(response){
      console.log("MONGOOSE Connected successfuly")
    }
  } catch(error){
    console.log("ERROR OCCURRED", error)
  }
}

module.exports = {initializeDBconnection}