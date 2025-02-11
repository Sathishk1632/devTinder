const express=require('express')
const app=express()
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const User=require('../models/user');
const validator=require('validator')
const authRouter=express.Router();
const {signupdatavalidator}=require("../utils/validation")
const bcrypt=require('bcrypt');
const userAuth = require('../middlewares/auth');

authRouter.post("/signup", async (req,res)=>{
    try{
            const {firstName,lastName,emailId,password,age,gender}=req.body;
            //validating inputs
            signupdatavalidator(req);
            //encrypting password
            const hashedpwd=await bcrypt.hash(password,10)
            
            const user=new User({
                firstName,
                lastName,
                emailId,
                password:hashedpwd,
                age,
                gender
            })
         const result=await user.save();
         const token=await result.getToken(); 
        res.cookie("token",token)
        res.send(result)
        }
        catch(err){
            res.status(400).send("Cannot register user : "+err.message)
        }
})
authRouter.post("/login",async (req,res)=>{
    try{
            const {emailId,password}=req.body;
            
            if(!validator.isEmail(emailId))
            {
                throw new Error("Invalid Email id.")
            }
           
            const user=await User.findOne({emailId:emailId});
            
            if(!user)
            {throw new Error("User does not exists.") }
                   
            else{
                const ispwdvalid=await user.validatePassword(password);
                if(!ispwdvalid){ 
                    throw new Error("Invalid Credentials...")
                }
                else{
                    const token=await user.getToken(); 
                    res.cookie("token",token)
                    res.send(user)
                }
            }
        }
    catch(err){
        res.status(400).send(err.message)
            }
})

authRouter.get("/logout",userAuth,(req,res)=>{
    try {
        res.cookie("token",null,{expires:new Date()})
        res.send("Logged out successfully....")
    } catch (err) {
        res.cookie("token","")
        res.send("Logged out Abruptly...."+err.message)
    }
})
module.exports=authRouter;