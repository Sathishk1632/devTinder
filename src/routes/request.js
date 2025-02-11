const express=require('express')

const requestRouter=express.Router();
const userAuth=require("../middlewares/auth");
const User = require('../models/user');
const ConnectionRequestModel = require('../models/connectionRequest');

requestRouter.post("/send/:toId/:status",userAuth,async (req,res)=>{
    try {
        const fromUserId=req.user._id;
        const toUserId=req.params.toId;
        const status=req.params.status;
        console.log("lalo : ",status);
        
        const allowedStatus=["INTERESTED","IGNORED"]
        if(!allowedStatus.includes(status)){
            throw new Error("Invalid Status....")
        }
        const isUserExist=await User.findById({_id:toUserId});
        if(!isUserExist){
            throw new Error("User does not exist...")
        }
        const connectionRequest=new ConnectionRequestModel({
            fromId:fromUserId,
            toId:toUserId,
            status:status
        })

        const data=await ConnectionRequestModel.findOne({$or: [
                            { toId:toUserId,fromId:fromUserId },
                            { toId:fromUserId,fromId:toUserId }
                                                              ]});
       
                                                              
        if(data && data.status=="INTERESTED"){
            throw new Error("Rquest already exists...")
        }
        if(data && data.status=="ACCEPTED"){
            throw new Error("Already in your Connection..")
        }
        await connectionRequest.save();
        res.send(`Connection request sent...`)

    } catch (err) {
        res.status(400).send("ERROR : "+err.message)
    }
})
requestRouter.post("/review/:status/:reqId",userAuth,async (req,res)=>{
    try {
        
        const {status,reqId}=req.params;
        const loggedInUser=req.user;
        console.log("Status : ",status);
        
        
        const allowedStatus=["ACCEPTED","REJECTED"]
        if(!allowedStatus.includes(status)){
            throw new Error("Invalid Status...")
        }
        const connectionRequest=await ConnectionRequestModel.findOne(
            {_id:reqId,
            toId:loggedInUser._id,
            status:"INTERESTED"}
        )

       if(!connectionRequest){
            throw new Error("No connection request...")
        }
        
        connectionRequest.status=status;
        await connectionRequest.save();
        res.send("Connection Request "+status)
        
    } catch (err) {
        res.status(404).send(err.message)
    }
})


module.exports=requestRouter;