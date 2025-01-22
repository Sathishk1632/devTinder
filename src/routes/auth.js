const express=require('express')
const app=express()
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const User=require('../models/user');
const validator=require('validator')
const authRouter=express.Router();
const signupdatavalidator=require("../utils/validation")
const bcrypt=require('bcrypt');

authRouter.post("/signup", async (req,res)=>{
    try{
            const {firstName,lastName,emailId,password}=req.body;
            //validating inputs
            signupdatavalidator(req);
            //encrypting password
            const hashedpwd=await bcrypt.hash(password,10)
            
            const user=new User({
                firstName,
                lastName,
                emailId,
                password:hashedpwd
            })
            await user.save()
            res.send("User registered Successfully...")
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
            {throw new Error("Invalid credentials...") }
                   
            else{
                const ispwdvalid=await user.validatePassword(password);
                if(!ispwdvalid){ 
                    throw new Error("Invalid Credentials...")
                }
                else{
                    const token=await user.getToken();
                   
                    
                    res.cookie("token",token)
                    res.send("Logged in Successfully...")
                }
            }
        }
    catch(err){
        res.status(400).send("Login Unsuccessfull : "+err.message)
            }
})
module.exports=authRouter;