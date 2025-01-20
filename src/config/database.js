const mongoose=require('mongoose')

const dbConFun=async ()=>{
    await mongoose.connect("mongodb+srv://sathish:Mahiway07@namastenode.b5mga.mongodb.net/devTinder")
}

module.exports=dbConFun
