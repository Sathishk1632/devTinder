
const userAuth = require('../middlewares/auth');
const ConnectionRequestModel = require('../models/connectionRequest');
const Post = require('../models/post');

const postsRouter=require('express').Router();

postsRouter.get("/getMyPosts",userAuth, async(req,res)=>{
   
    const posts=await Post.find({posterId:req.user._id});
    console.log("Posts:",posts);
    res.send(posts);
})

postsRouter.get("/getPosts/:userId",userAuth,async(req,res)=>{//{$or :[{fromId:loggedInUser._id},{toId:loggedInUser._id}]}
    
    const fromId=req.user._id;
    console.log("from----->>   ",fromId);
    
    
    const whoseId=req.params.userId
    console.log("to----->>   ",whoseId);
    const isConnected=await ConnectionRequestModel.find(
        {
            $or: [
              {
                fromId: fromId,
                toId: whoseId,
                status: "ACCEPTED"
              },
              {
                fromId: whoseId,
                toId: fromId,
                status: "ACCEPTED"
              }
            ]
          }
       //{$and:[{$or:[{$or:[{fromId:userid},{toId:userid}]},{$or:[{toId:req.user._id},{fromId:req.user._id}]}]},{_id:"ACCEPTED"}]}
    )
    console.log("isConnected....",isConnected);
    
    if(isConnected.length>0){
        const posts=await Post.find({posterId:whoseId})
        if(posts){
            res.send(posts)
        }
        else{
            res.send("No posts available")
        }
    }
    else{
        res.send("You Havent Connected Each Other.....")
    }
})
 module.exports=postsRouter;