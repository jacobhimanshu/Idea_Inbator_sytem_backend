import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const verifyjwt =async (req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");
        if(!token){
            return res.status(400).json({message:"Unorthorized no token provided"})
        }
        // console.log("tokem",token)
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded.id);
        req.user = user;
        next();
    } catch (error) {
        return res.status(400).json({message:"Unorthorized :Invalid token"})
    }
}

