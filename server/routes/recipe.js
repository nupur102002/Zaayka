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
    const {title,body,pic}=req.body;
    if(!title || !body || !pic )
    {
        return res.status(422).json({error :"Please add all the fields"});
    }
      req.user.password=undefined    // to remove the password from post
     
    const recipe=new Recipe({
        title,
        body,
        photo:pic,
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
        res.json({myrecipe})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.put('/like',requireLogin,(req,res)=>{
      Recipe.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
      },{
        new :true
      }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
      })
})
router.put('/unlike',requireLogin,(req,res)=>{
      Recipe.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
      },{
        new :true
      }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
      })
})

module.exports=router;