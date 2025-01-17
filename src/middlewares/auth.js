const adminAuth=(req,res,next)=>{
    const data=req.query;
    
    console.log("Admin check is going....");
    if(data.usertype!="admin"){
       
        
        res.send("Not admin....")
    }
    else{
        next()
    }
}

const userAuth=(req,res,next)=>{
    const data=req.query;
    
    console.log("User check is going....");
    if(data.usertype!="user"){
       
        
        res.send("Not user....")
    }
    else{
        next()
    }
}
module.exports={adminAuth,userAuth};