const validator=require('validator')
const express=require('express');
const app=express();
const route=express.Router();
const dbConFun=require("./config/database")
const User=require('./models/user');
const signupdatavalidator=require("./utils/validation")
const bcrypt=require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt=require('jsonwebtoken')
const userAuth=require("./middlewares/auth")
const port=3000;
app.use(express.json())
app.use(cookieParser())



const authRouter=require('./routes/auth')
const profileRouter=require('./routes/profile')
const requestRouter=require('./routes/request')

app.use("/auth",authRouter)
app.use("/profile",profileRouter)
app.use("/request",requestRouter)
// app.post("/signup", async (req,res)=>{
//     try{
//             const {firstName,lastName,emailId,password}=req.body;
//             //validating inputs
//             signupdatavalidator(req);
//             //encrypting password
//             const hashedpwd=await bcrypt.hash(password,10)
//             console.log(hashedpwd);
//             const user=new User({
//                 firstName,
//                 lastName,
//                 emailId,
//                 password:hashedpwd
//             })
//             await user.save()
//             res.send("User registered Successfully...")
//         }
//         catch(err){
//             res.status(400).send("Cannot register user : "+err.message)
//         }
// })


// app.post("/login",async (req,res)=>{
//     try{
//             const {emailId,password}=req.body;
            
//             if(!validator.isEmail(emailId))
//             {
//                 throw new Error("Invalid Email id.")
//             }
           
//             const user=await User.findOne({emailId:emailId});
            
//             if(!user)
//             {throw new Error("Invalid credentials...") }
                   
//             else{
//                 const ispwdvalid=await bcrypt.compare(password,user.password);
//                 if(!ispwdvalid){
//                     throw new Error("Invalid Credentials...")
//                 }
//                 else{
//                     const token=await user.getToken();
                    
//                     res.cookie("token",token)
//                     res.send("Logged in Successfully...")
//                 }
//             }
//         }
//     catch(err){
//         res.status(400).send("Login Unsuccessfull : "+err.message)
//             }
// })

// app.get("/profile",userAuth,async (req,res)=>{
//     try {
//         const user=req.user;
//         res.send(user)
//     } catch (error) {
//         res.send("Cannot find details.."+error.message)
//     }
// })

// app.post("/sendrequest",userAuth,async (req,res)=>{
//     try {
//         const user=req.user;
//         res.send(`${user.firstName} Sending connection request....`)
//     } catch (error) {
        
//     }
// })











dbConFun().
then(()=>{
    console.log("DB Connection Successfull....");
    app.listen(port,()=>{
        console.log(`Listening at port : ${port}`);
    }) 
}).catch(err=>{
    console.log(`Cannot connect to DB : ${err.message}`);
    
})





