const User = require("../models/userModel");
const Shop  = require("../models/shopModel");

const shopController = {
     create:async(req,res)=>{
        try{
         const newShop = new Shop(req.body)
         const saveShop = await newShop.save();
        return res.status(201).json({
            message:"Shop added successfully",
            data:saveShop
        })
        }catch(err){
            return res.status(500).json({err:err.message});
        }
     },
     shopDetail:async(req,res)=>{
        try{
        const _id = req.params.id;
        const detail = await Shop.findById(_id);
        return res.status(200).json({
            message:"Success",
            data:detail
        })
        }catch(err){
            return res.status(500).json({err:err.message});
        }
     },

     comments:async(req,res)=>{
        try{
           const  user = await User.findById(req.user.id).select('-password');
           const shop = await Shop.findById(req.params.id)
           const newComment = {
            Comment:req.body.Comment,
            name:user.name,
            user:req.user.id
           }
           shop.review.unshift(newComment);
           await shop.save();
           return res.status(201).json({
            message:"Comment added sucessfully.",
            data:shop
           })
        }catch(err){
            return res.status(500).json({err:err.message});
        }
     },
}

module.exports  = shopController