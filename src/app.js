const express=require('express');

const app=express();
const port=3000;
app.use("/namaste",(req,res)=>{
    res.send("Namaste from the server....")
})
app.use("/hello",(req,res)=>{
    res.send("Hello from the server....")
})

app.listen(port,()=>{
    console.log(`Successfully running on port ${port}`);
    
});