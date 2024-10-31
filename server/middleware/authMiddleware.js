const jwt=require("jsonwebtoken");

const SECRET_KEY="Nagasai-challa";

module.exports=(req,res,next)=>{
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
};