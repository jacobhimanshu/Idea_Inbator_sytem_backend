import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
const regesterUser = async(req,res) =>{
          try {
            const {name,email,password} = req.body
            // console.log("email",email,"pass",password)
            if(!name || !email || !password){
              return res.status(400).json({message:"All fiels are required"});
            }
              const existingUser = await User.findOne({email});
              if(existingUser){
                  return res.status(400).json({message:"User already exist"})
              }
              const hashedPassword = await bcrypt.hash(password, 10);
              const newUser = await User.create({
                  email,
                  name,
                  password:hashedPassword
              })
                    const createduser = await User.findById(newUser._id).select("-password")
                    if(!createduser){
                      return res.status(400).json({message:"someting went wrong while registering user"})
                    }
                    return res.status(201).json({
                      createduser,
                      success:true,
                      message:"user registered succesfully"
                    })
                }
                catch (error) {
                     return res.status(500).json({message:"Error while registering"}) 
                }   
          }

const loginUser = async (req,res)=>{
    try {
          const {email ,password} = req.body;
          // console.log("email",email,"pass",password)
          if(!email || !password){
            return res.status(400).json({
                message:"Email or password is missing"
            })
          }
          const user = await User.findOne({email});
        //   console.log("user",user)
          if(!user){
            return res.status(400).json({message:"user doesnot exist"})
          }
     const isPasswordValid = await bcrypt.compare(password, user.password);
     
    //  console.log("userpass",user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // console.log(" Generating token...");
      const accesToken = jwt.sign(
        {
            id:user._id.toString(),
            email:user.email,
            name:user.name
        },
          process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
    // console.log(" Generated Token:", accesToken);
    const options = {
        httpOnly: true,
        secure: true,
    };
       return res.
                 cookie("accessToken", accesToken, options)  
       .status(200).json({
      success: true,
      message: "Login successful",
      accesToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
    } catch (error) {
         return res.status(400).json({message:"Error while login"})
    }
}

export {
regesterUser,
loginUser
}