const express=require('express')

const requestRouter=express.Router();
const userAuth=require("../middlewares/auth")

requestRouter.post("/sendrequest",userAuth,async (req,res)=>{
    try {
        const user=req.user;
        res.send(`${user.firstName} Sending connection request....`)
    } catch (error) {
        
    }
})

module.exports=requestRouter;