const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
       
    }

},{timestamps:true})

module.exports = new mongoose.model("User", userSchema)