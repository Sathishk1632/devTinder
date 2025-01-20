const validator=require('validator')
const express=require('express');
const app=express();
const dbConFun=require("./config/database")
const User=require('./models/user');
const bcrypt=require('bcrypt')
const validatesignupdata=require("./utils/validation")
const port=3000;
app.use(express.json())


app.post("/signup",async (req,res)=>{

    const{firstName,lastName,emailId,password}=new User(req.body);
    try{
        //validate signup data 
        validatesignupdata(req);
        //encrypt password
        const hashedPwd=await bcrypt.hash(password,10)
        
        const user=new User({
            firstName,
            lastName,
            emailId,
            password:hashedPwd
        })
        
        await user.save();
        res.send("User registered Successfully.....");
    }
    catch(err){
        res.status(400).send("Cannot register user : "+err)
    }
})


app.post("/login",async (req,res)=>{
    try{
        const {emailId,password}=req.body;
        console.log(emailId+"  "+password);
        
        if(!validator.isEmail(emailId)){
            throw new Error("Enter the valid email Id");
        }

        const user=await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid Credentials")
        }
        const ispwdValid=await bcrypt.compare(password,user.password)
        if(ispwdValid){
            res.send("Logged in Successfully...")
        }
        else{
            throw new Error("Invalid credentials")
        }
    }
    catch(err){
        res.status(400).send("Login Unsuccessfull : "+err.message)
    }
})


app.get("/feed",async (req,res)=>{
    try{
        const users= await User.find({});
        if(users.length==0){
            res.status(404).send("No feed to show...")
        }
        else{
            res.send(users)
        }
    }
    catch(err){
        res.status(400).send("Cannot load the feed...")
    }
})

app.get("/user",async (req,res)=>{
    const usermail=req.body.emailId;
    try{
            const user=await User.find({emailId:usermail})
           if(user==null || user.length==0){
            res.status(404).send("No user found for this MailId....")
           }
           else{
            res.send(user);
           }
    }
    catch(err){
        res.status(400).send("Cannot fetch the users....")
    }
})

app.delete("/delete",async (req,res)=>{
    const id=req.body.id;
    console.log(id);
    
    try{
        await User.findByIdAndDelete(id);
        res.send("User Deleted successfully...")
    }
    catch(err){
        res.send("Cannot delete user...")
    }
})

app.patch("/update",async (req,res)=>{
    const id=req.body._id;
    const user=req.body;
    try{
        await User.findByIdAndUpdate({_id:id},user);
        res.send("User Updated successfully...")
    }
    catch(err){
        res.status(404).send("Cannot update user")
    }
})

app.put("/update2",async (req,res)=>{
    const id=req.body.emailId;
    const user=req.body;
    try{
        await User.findOneAndUpdate({emailId:id},user);
        res.send("User Updated successfully...")
    }
    catch(err){
        res.status(404).send("Cannot update user")
    }
})























// app.post("/signup",async (req,res)=>{
//     const user=new User(req.body);
//     try{
//         await user.save();
//         res.send("User saved successfully....")
//     }
//     catch(err){
//         res.status(404).send("Cannot resgister User....")
//     }
// })

// app.get("/user",async (req,res)=>{
//     const usermail=req.body.emailId;
//     try{
//         const user= await User.find({emailId:usermail});
//         if(user.length==0){
//             res.status(404).send("No user found..")
//         }
//         else
//             res.send(user)
//     }
//     catch(err){
//         res.status(404).send(`Cannot load your feed : ${err.message}`)
//     }
// })

// app.get("/feed",async (req,res)=>{
//     try{
//         const users= await User.find();
//         res.send(users)
//     }
//     catch(err){
//         res.status(404).send("no users found")
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





