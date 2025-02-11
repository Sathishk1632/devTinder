
const jwt=require('jsonwebtoken');
const User = require('../models/user');

const userAuth=async (req,res,next)=>{
    try{
        
    const cookies=req.cookies;
    
    
    const {token}=cookies;
    
    
    const decoded=await jwt.verify(token,"SECRETEKEY")
    const {_id}=decoded;
    const user=await User.findById(_id);
    if(!user){
        throw new Error("User not found...");
    }
    req.user=user;
    next();
}
catch(err){
    if(err.message=="jwt must be provided"){
        res.status(401).send("Please login...")
    }else
{res.status(400).send("Oops Something went wrong...."+err.message)}
}
}
module.exports=userAuth;