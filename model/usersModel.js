const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    firstname: {
    type: String,
    required: [true, "firstname is required"],
  
  },
  lastname: {
    type: String,
    required: [true, "lastname enis required"],
   
  },
  gender: {
    type: String,
    required: [true, "please enter your gender"],
   
  },
  date_of_birth: {
    type: String,
    required: [true, "please enter your Date nof Birth"],
    
  },
  password:{
      type: String,
      select:false
  },
  username:{
    type: String,
    select:false

  }


}, {timestamps:true})

userSchema.methods.correctPassword = async function (enteredPassword) {
   

    return await bcrypt.compare(enteredPassword, this.password);
  };


module.exports = mongoose.model("User", userSchema);
