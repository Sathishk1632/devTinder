
const express=require('express');
const app=express();
const dbConFun=require("./config/database")
const User=require('./models/user');
const port=3000;
app.use(express.json())
app.post("/signup",async (req,res)=>{
    const user=new User(req.body);
    try{
        await user.save();
        res.send("User saved successfully....")
    }
    catch(err){
        res.send("Cannot resgister User....")
    }
})

dbConFun().
then(()=>{
    console.log("DB Connection Successfull....");
    app.listen(port,()=>{
        console.log(`Listening at port : ${port}`);
    }) 
}).catch(err=>{
    console.log(`Cannot connect to DB : ${err.message}`);
    
})





