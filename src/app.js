const express=require('express');

const app=express();
const port=3000;

app.get("/user",(req,res,next)=>{
    console.log("1st RH....");
    next()
    // res.send("1st Handler");
   
},(req,res,next)=>{
    console.log("2nd RH....")
    next()
    // res.send("2ndt Handler")
},(req,res,next)=>{
    console.log("3nd RH....")
    next()
    // res.send("2ndt Handler")
},(req,res,next)=>{
    console.log("4nd RH....")
    next()
    // res.send("2ndt Handler")
})

app.listen(port,()=>{
    console.log(`Successfully running on port ${port}`);
    
});