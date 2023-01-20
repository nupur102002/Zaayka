const express = require("express"); 
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin=require("../middleware/requireLogin");
const Recipe=mongoose.model("Recipe");


//for all recipes 
router.get("/allrecipe",requireLogin,(req,res)=>{
    Recipe.find()                         //finding all posts  without any condition
    .populate("postedBy","_id name")  //   showing _id and name in postedBy
    .then(recipes=>{
        res.json({recipes:recipes})   
    })
    .catch(err=>{
        console.log(err)
    })
})


//Create new recipe 
router.post("/createrecipe",requireLogin,(req,res)=>{
    const {title,body,vid}=req.body;
    if(!title || !body || !vid )
    {
        return res.status(422).json({error :"Please add all the fields"});
    }
      req.user.password=undefined    // to remove the password from post
     
    const recipe=new Recipe({
        title,
        body,
        video:vid,
        postedBy:req.user
    })
    recipe.save().then(result=>{
        res.json({recipe:result})
    })
    .catch(err=>{
        console.log(err)
    });
   
});

//  my uploaded recieps
router.get("/myrecipe",requireLogin,(req,res)=>{  
    Recipe.find({postedBy: req.user._id})  
    .populate("postedBy","_id name")  //it will expand only _id and name
    .then(myrecipe=>{
        res.json({recipe:recipe})
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports=router;