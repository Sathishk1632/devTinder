const User=require('../models/user')
const userAuth = require('../middlewares/auth');
const ConnectionRequestModel = require('../models/connectionRequest');

// const cloudinary=require('../utils/cloudinary');


const cloudinary = require("../utils/cloudinary");
const upload = require("../middlewares/multer");
const Post = require('../models/post');
const userRoute=require('express').Router();
// const allowedPublicData="firstName lastName"
//const upload=require('../middlewares/multer')

userRoute.get("/getRequests/recieved",userAuth,async (req,res)=>{
    try {
        const loggedInUser=req.user;
        
        
        const requests=await ConnectionRequestModel.find({toId:loggedInUser._id,status:"INTERESTED"}).populate("fromId");
        if(!requests||requests.length==0){
            throw new Error("No Connection requests..")
        }
        
        res.send(requests)
    } catch (err) {
        res.status(404).send(err.message);
    }
})

userRoute.get("/connections",userAuth,async (req,res)=>{
    try {
        const loggedInUser=req.user;
       // const connections=await ConnectionRequestModel.find({$and:[{$or:[{toId:loggedInUser._id},{fromId:loggedInUser._id}]},{status:"ACCEPTED"}}]}).populate("fromId","firstName lastName");
       const connections=await ConnectionRequestModel.find({
        $and: [
            { status: "ACCEPTED" },
            {
                $or: [
                    { toId: loggedInUser._id },
                    { fromId: loggedInUser._id}
                ]
            }
        ]
    }).populate("fromId").populate("toId");
    
    if(!connections||connections.length==0){
            throw new Error("No Connections established...")
    }
    
    
    const data=connections.map((row)=>{
        if(row.fromId._id==loggedInUser._id.toString()){
            return row.toId;
        }
        else{
            return row.fromId;
        }
    })
    console.log(data);
    
    res.send(data)
    } catch (err) {
        res.status(400).send("ERROR : "+err.message)
    }
})

userRoute.get("/feed",userAuth,async (req,res)=>{
    try {
        const page=parseInt(req.query.page)
        let limit=parseInt(req.query.limit)
        limit=limit>20?20:limit;
        const skip=(page-1)*limit;
        const loggedInUser=req.user;
        const connections=await ConnectionRequestModel.find({$or :[{fromId:loggedInUser._id},{toId:loggedInUser._id}]});
        
        const hideUsers=new Set();
        connections.forEach((item)=>{
            hideUsers.add(item.fromId);
            hideUsers.add(item.toId);
        })

        const users=await User.find({
            $and:[
                {_id: { $nin :Array.from(hideUsers)}}
                ,{_id :{$ne :loggedInUser._id}}
            ]
        }).select("firstName lastName gender age about photoUrl").skip(skip).limit(limit);
        res.send(users)
    } catch (err) {
        res.status(400).send({message:"Error : "+err.message})
    }
})

userRoute.post('/newPost', upload.single('file'),userAuth, async (req, res)=>{
    try {
        const fileUrl=cloudinary.uploader.upload(req.file.path, function (err, result){
            if(err) {
              return res.status(500).json({
                success: false,
                message: "Error"
              })
            }
          })
          const post=new Post({
            posterId:req.user._id,
            description:req.body.caption,
            data:fileUrl.url
          })
          const savedPost=await post.save();
          res.send(savedPost)
          
    } catch (error) {
        
    }
   

  });
module.exports=userRoute;