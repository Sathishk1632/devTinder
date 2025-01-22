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
        
        const allowedStatus=["INTERESTED","IGNORED"]
        if(!allowedStatus.includes(status)){
            throw new Error("Invalid Status....")
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
        if(data){
            throw new Error("Rquest already exists...")
        }
        await connectionRequest.save();
        res.send(`Connection request sent...`)

    } catch (err) {
        res.status(400).send("ERROR : "+err.message)
    }
})

module.exports=requestRouter;