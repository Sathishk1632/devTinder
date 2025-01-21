const jwt=require('jsonwebtoken');
const User=require("../models/user")
const userAuth=async (req,res,next)=>{
try {
    const {token}=req.cookies;
    if(!token){
        throw new Error("Token not found...")
    }
    const decodeid=await jwt.verify(token,"SECRETEKEY")
    
    const {emailId}=decodeid;
    const user= await User.findOne({emailId:emailId})
    if(!user){
        throw new Error("User not found")
    }
    
    
    req.user=user;
    next();
} catch (error) {
    res.status(400).send("Cannot fetch profile : "+error.message)
}
}
module.exports=userAuth;