const express=require('express');
const {adminAuth,userAuth}=require('./middlewares/auth')

const app=express();
const port=3000;


app.get("/user/getUserDetails",(req,res)=>{
    throw new Error("Blah blah blah blah.......")
    // try{
    //     throw new Error("Blah blah blah blah.......")
    //     res.send("user data sent......")
    // }
    // catch(err){
    //     res.status(400).send("Something went wrong please contact support team....")
    // }
})

app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(400).send("Somethings went wrong please contact support team....")
    }
})




















// app.use("/admin",adminAuth)
// app.get("/user/login",(req,res)=>{
//     console.log("Login.....");
//     res.send("Logged in Successfully.....")
// })
// app.use("/user",userAuth)

// app.get("/admin/getalluserdata",(req,res)=>{
//     console.log("getting all user data...");
//     res.send("All user data....")
// })
// app.delete("/admin/deletealluser",(req,res)=>{
//     console.log("deleting all user...");
//     res.send("Deleted All users....")
// })

// app.get("/user/myProfile",(req,res)=>{
//     console.log("Getting my profile....");
//     res.send("Your profile.......")
// })
// app.patch("/user/updateMyProfile",(req,res)=>{
//     console.log("Updating my profile....");
//     res.send("Updated Your profile.......")
// })


app.listen(port,()=>{
    console.log(`Successfully running on port ${port}`);
    
});