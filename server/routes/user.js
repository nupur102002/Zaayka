//jshint esversion:6
const express = require("express"); 
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin=require("../middleware/requireLogin");
const Recipe=mongoose.model("Recipe");
const User = mongoose.model("User");

router.get('/user/:id',requireLogin,(req,res)=>{      // here we get the "id" of the user along with url , whose profile we want to see
    User.findOne({_id:req.params.id})                   // query to find the user using "id" in "User" db
    .select("-password")                                   // select all the field except password
    .then(user=>{
         Recipe.find({postedBy:req.params.id})                  // if user exist then find the recipes of that user  // or query for find the recipes of that user
         .populate("postedBy","_id name")
         .exec((err,posts)=>{
             if(err){
                 return res.status(422).json({error:err})
             }
             res.json({user,posts})
         })
    }).catch(err=>{
        return res.status(404).json({error:"User not found"})
    })
})


module.exports=router;