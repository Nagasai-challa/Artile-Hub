const mongoose=require("mongoose")

const postSchema=new mongoose.Schema({
    title : String,
    content : String,
    email : String,
})

module.exports=mongoose.model("Post",postSchema);