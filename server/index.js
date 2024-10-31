const express = require("express");       
const connectDB = require("./config/db"); 
const cors=require("cors");
const mongoose = require("mongoose");
const jwt=require("jsonwebtoken");

const app = express();
connectDB();                             

const SECRET_KEY="NAGASAI_CHALLA";

//Schemans
const postSchema=new mongoose.Schema({
    title : String,
    content : String,
    email : String,
})

const userSchema = new mongoose.Schema({
    username: { type: String},
    email: { type: String},
    password: { type: String},
});

//Models

const Admin=mongoose.model("Admin",userSchema);
const User=mongoose.model("User",userSchema);
const Post=mongoose.model("Post",postSchema);

//MiddelWares
app.use(express.json());

app.use(cors());

function authenticateUser(req,res,next){
    const token = req.get('Authorization')?.split(' ')[1];
    if(!token){
        res.status(401).json({message:"Access Denied"})
    }
    try{
        const user=jwt.verify(token,SECRET_KEY);
        req.user=user;
        next();
    }catch(error){
        res.status(400).json({ error: "Invalid token" });
    }
}


//Routes

app.post("/admin-register",async (req,res)=>{
    try{
        console.log("Got Request For Admin Register")
        const {username,email,password}=req.body;
        const newAdmin=new Admin({username,email,password});
        await newAdmin.save();
        res.status(200).json({message:"Admin Registred Successfully"})
    }catch(error){
        res.status(400).json({error:"Admin Failed To Register"})
    }
})

app.post("/user-register",async (req,res)=>{
    try{
        console.log("Got Request For User Register")
        const {username,email,password}=req.body;
        const newUser=new User({username,email,password});
        await newUser.save();
        res.status(200).json({message:"User Registred Successfully"})
    }catch(error){
        res.status(400).json({error:"User Failed To Register"});
    }
})

app.post("/admin-login",async (req,res)=>{
    try{
        console.log("Got Request For Admin Login");
        const {email,password}=req.body;
        const user=await Admin.findOne({email,password});
        if(!user){
            return res.status(400).json({message:"Invalid Admin Credentials"});
        }
        const token=jwt.sign({email},SECRET_KEY,{expiresIn:'1h'});
        res.status(200).json({token});
    }catch(error){
        console.log(error);
        res.status(400).json({error:"Admin Failed To login"});
    }
});

app.post("/user-login",async (req,res)=>{
    try{
        console.log("Got Request For User Login");
        const {email,password}=req.body;
        const user=await User.findOne({email,password});
        if(!user){
            return res.status(401).json({message:"Invalid User Credentials"});
        }
        const token=jwt.sign({email},SECRET_KEY,{expiresIn:'1h'});
        res.status(200).json({token});
    }catch(error){
        console.log(error);
        res.status(400).json({error:"User Failed To Login"});
    }
})

app.get("/get-all-posts",authenticateUser,async (req,res)=>{
    try{
        console.log("Got Request For Get All Posts");
        const posts=await Post.find();
        if(!posts){
            res.status(401).json({message:"Posts Not Found"});
        }
        res.status(200).json({posts});
    }catch(error){
        console.log(error);
        res.status(400).json({error:"Failed To Get Posts"});
    }
})

app.get("/get-admin-posts",authenticateUser,async (req,res)=>{
    try{
        console.log("Got Request For Get Admin Posts");
        const {email}=req.query;
        const posts=await Post.find({email});
        if(!posts){
            res.status(401).json({message:"Posts Not Found"});
        }
        res.status(200).json({posts});
    }catch(error){
        console.log(error);
        res.status(400).json({error:"Failed To Get Posts"});
    }
})

app.get("/get-single-post",authenticateUser,async (req,res)=>{
    try{
        console.log("Got Request For Get Single Post");
        const {id}=req.query;
        const post=await Post.findById(id);
        console.log(post)
        if(!post){
            res.status(401).json({message:"Post Not Found"});
        }
        res.status(200).json({post});
    }catch(error){
        console.log(error);
        res.status(400).json({error:"Failed to Retrive Post"});
    }
});

app.post("/create-post",authenticateUser,async (req,res)=>{
    const {title,content,email}=req.body;
    try{
        console.log("Got Request For  Create Post");
        const newPost=new Post({title,content,email});
        await newPost.save();
        res.status(200).json({message:"Post Created SuccessFully"});
    }catch(error){
        console.log(error);
        res.status(400).json({error:"Failed To Create Post"});
    }
})

app.post("/edit-post",authenticateUser,async (req,res)=>{
    const {title,content,email,id}=req.body;
    try{
        console.log("Got Request For Edit Post");
        await Post.deleteOne({_id:id});
        const newPost=new Post({title,content,email});
        await newPost.save();
        res.status(200).json({message:"Post Edited Successfully"})
    }catch(error){
        console.log(error);
        res.status(400).json({error:"Failed To Edit Post"});
    }
})

app.post("/delete-post",async (req,res)=>{
    const {id}=req.query;
    console.log("Got Request For Delete Post");
    try{
        await Post.deleteOne({_id:id});
        res.status(200).json({message:"Post Deleted Successfully"})
    }catch(error){
        console.log(error);
        res.status(400).json({error:"Failed To Delete Post"});
    }
})



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
