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

const validateEditprofildata=(req)=>{
    const allowesEdits=["firstName","lastName","about","skills","age","photoUrl","gender"];
    const isAllowed=Object.keys(req.body).every(field=>allowesEdits.includes(field));
    return isAllowed;
}

module.exports={signupdatavalidator,validateEditprofildata};