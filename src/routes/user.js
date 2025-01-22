const userAuth = require('../middlewares/auth');
const ConnectionRequestModel = require('../models/connectionRequest');

const userRoute=require('express').Router();

userRoute.get("/getRequests/recieved",userAuth,async (req,res)=>{
    try {
        const loggedInUser=req.user;
        
        
        const requests=await ConnectionRequestModel.find({toId:loggedInUser._id,status:"INTERESTED"}).populate("fromId","firstName lastName age");
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

    res.json(data)
    } catch (err) {
        res.status(400).send("ERROR : "+err.message)
    }
})
module.exports=userRoute;