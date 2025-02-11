const express=require('express')
const User=require("../models/user")
const bcrypt=require('bcrypt')
const profieRouter=express.Router();
const validator=require('validator')
const userAuth=require("../middlewares/auth")
const {validateEditprofildata}=require("../utils/validation")

profieRouter.get("/view",userAuth,async (req,res)=>{
    try {
        const user=req.user;
        res.send(user)
    } catch (error) {
        res.send("Cannot find details.."+error.message)
    }
})

profieRouter.patch("/edit",userAuth,async (req,res)=>{
    try {
        if(!validateEditprofildata(req)){
            throw new Error("Something went wrong....")
        }
        const user=req.user;
        
        Object.keys(req.body).forEach((key)=>(user[key]=req.body[key]))
        
        await user.save();
        //await User.findByIdAndUpdate(user._id,user);
       // res.send("User update successfully....")
        res.json({user
        })
    } catch (err) {
        res.status(400).send("Update failed..."+err.message)
    }
})
profieRouter.patch("/updatePassword",userAuth,async (req,res)=>{
    try {
        const {password}=req.body;
    if(!validator.isStrongPassword(password)){
        throw new Error("Please enter Strong password...")
    }
    const user=req.user;
    const isSame=await user.validatePassword(password);
    if(isSame){
        throw new Error("Password should not same as Old PassWord")
    }
    user.password=await bcrypt.hash(password,10);
    user.save();
    res.send("password updated successfully...")
    } catch (err) {
        res.status(400).send("Cannot update password : "+err.message)
    }
    
})


module.exports=profieRouter;