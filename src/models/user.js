const mongoose=require('mongoose')
const validator=require('validator')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
function genderValidator(value){
    const allowedGenders = ['male', 'female', 'other']; 
    return allowedGenders.includes(value.toLowerCase());
}
const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        unique:[true,"User already exist with this emailId"],
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Not a valid mailId")
            }

        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Please enter the strong password...minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1")
            }
        }
    },
    age:{
        type:Number,
        min:[18,"User should be minimum 18 Years old"],
        
    },
    gender:{
        type:String,
       
        validate: { validator: genderValidator, message: 'Gender must be "Male", "Female", or "Other".' }
        },
    photoUrl:{
        type:String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Enter valid URL")
            }
        }
    },
    about:{
        type:String,
        default:"Developer....",
    },
    skills:{
        type:[String]
    }
},{timestamps:true})

userSchema.methods.getToken=async function(){
    const token=await jwt.sign({emailId:this.emailId},"SECRETEKEY",{expiresIn:"7d"})
    return token;
}

userSchema.methods.validatePassword=async function(passwordInput){
    const isValid=await bcrypt.compare(passwordInput,this.password)
    return isValid;
}

const User=mongoose.model("User",userSchema)

module.exports=User; 