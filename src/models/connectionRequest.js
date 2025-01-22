const mongoose=require('mongoose')

const connectionRequestSchema=new mongoose.Schema({
    fromId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    toId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
    },
    status:{
        type:String,
        enum:{
            values:["IGNORED","INTERESTED","ACCEPTED","REJECTED"],
            message:`{VALUE} is incorrect type`
        },
        required:true
    }

},{timestamps:true})

connectionRequestSchema.index({fromId:1,toId:1})

connectionRequestSchema.pre("save",function (next){
    const data=this;
    if(data.fromId.equals(data.toId)){
        throw new Error("Cannot send send Request to yourself")
    }
    next();
})
const ConnectionRequestModel=new mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports=ConnectionRequestModel;