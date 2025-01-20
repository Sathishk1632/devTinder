const mongoose=require('mongoose')
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
        unique:true,
        lowercase:true,
        match: /\S+@\S+\.\S+/
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min:[18,"User should be minimum 18 Years old"],
        required:true
    },
    gender:{
        type:String,
        required:true,
        validate: { validator: genderValidator, message: 'Gender must be "Male", "Female", or "Other".' }
        },
    photoUrl:{
        type:String
    },
    about:{
        type:String,
        default:"Developer....",
    },
    skills:{
        type:[String]
    }
},{timestamps:true})
const User=mongoose.model("User",userSchema)

module.exports=User; 