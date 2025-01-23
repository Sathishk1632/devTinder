const User=require('../models/user')
const userAuth = require('../middlewares/auth');
const ConnectionRequestModel = require('../models/connectionRequest');

const userRoute=require('express').Router();
const allowedPublicData="firstName lastName"

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
    }).populate("fromId",allowedPublicData).populate("toId",allowedPublicData);
    
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
        }).select("firstName lastName gender age about").skip(skip).limit(limit);
        res.send(users)
    } catch (err) {
        res.status(400).send({message:"Error : "+err.message})
    }

















    // try {
    //     const page=parseInt(req.query.page);
    //     let limit=parseInt(req.query.limit);
    //     limit=limit>20?20:limit;
    //     const skip=(page-1)*limit;
    //     const loggedInUser=req.user;
    //     //Find all the connection requests i have (sent + recieved)
    //     const connections=await ConnectionRequestModel.find({$or:[{toId:loggedInUser._id},{fromId:loggedInUser._id}]}).select("fromId toId");//.populate("fromId",allowedPublicData).populate("toId",allowedPublicData);
        
    //     const hideUsers=new Set();
    //     connections.forEach((element) => { 
    //         hideUsers.add(element.fromId.toString());
    //         hideUsers.add(element.toId.toString());
    //     });
        
    //     const users=await User.find({
    //        $and: [{_id:{$ne:loggedInUser._id}},{_id:{$nin:Array.from(hideUsers)}}]
    //     }).select("firstName lastName age gender skills about").skip(skip).limit(limit);
        
    //     res.send(users);
    // } catch (err) {
    //     res.status(400).send("ERROR : "+err.message)
    // }
})
module.exports=userRoute;