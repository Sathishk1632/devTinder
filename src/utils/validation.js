const validators=require('validator')
const signupdatavalidator=(req)=>{
    const {firstName,lastName,emailId,password}=req.body;

    if(!firstName || !lastName){
        throw new Error("Invalid name")
    }
    else if(!emailId || !validators.isEmail(emailId))
    {
        throw new Error("Invalid emailId")
    }
    else if(!validators.isStrongPassword(password)){
        throw new Error("Please enter strong password...")
    }
}

module.exports=signupdatavalidator;