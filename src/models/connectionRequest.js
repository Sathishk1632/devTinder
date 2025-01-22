const mongoose=require('mongoose')

const connectionRequestSchema=new mongoose.Schema({
    fromId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    toId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
    },
    status:{
        type:String,
        enum:{
            values:["IGNORE","INTERESTED","ACCEPTED","REJECTED"],
            message:`{VALUE} is incorrect type`
        },
        required:true
    }

},{timestamps:true})
const ConnectionRequestModel=new mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports=ConnectionRequestModel;