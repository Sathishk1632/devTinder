const express=require('express')
const profieRouter=express.Router();
const userAuth=require("../middlewares/auth")

profieRouter.get("/view",userAuth,async (req,res)=>{
    try {
        const user=req.user;
        res.send(user)
    } catch (error) {
        res.send("Cannot find details.."+error.message)
    }
})


module.exports=profieRouter;