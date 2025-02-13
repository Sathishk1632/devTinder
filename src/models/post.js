const mongoose=require('mongoose')

const postSchema=mongoose.Schema({
    posterId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
    },
    likes:{
        type:Number,
    },
    description:{
        type:String
    },
    data:{
        type:String,
    }
},{timestamps:true});
const Post=mongoose.model("Post",postSchema);
module.exports=Post;