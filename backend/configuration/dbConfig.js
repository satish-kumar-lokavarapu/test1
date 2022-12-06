// Imported mongoose dependecies
const mongoose = require("mongoose");

// Connecting to MongoDB
mongoose.connect(process.env.MONGODB_URL , {
  useNewUrlParser:true,
  useUnifiedTopology:true
},(error) => {
  if(!error){
      console.log("connected to db");
  }
  else {
      console.log("error in connecting to DB");
  }
});

module.exports = mongoose;
