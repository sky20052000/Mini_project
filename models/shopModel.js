const mongoose = require("mongoose")

const shopSchema = new mongoose.Schema({
       userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
       },
       owner:{
        type:String,
        required:true
       },
       shop_name:{
        type:String,
        required:true
       },
       location:{
        type:String,
        required:true
       },
       review:[
          {
              user:{
                     type:mongoose.Schema.Types.ObjectId,
                     ref:'User'
              },
              Comment:{
                     type:String,
                     required:true
              },
              name:{
                     type:String,
              }
          } 
       ]
},{timestamps:true})

module.exports = new mongoose.model("Shop", shopSchema)