import express from "express"
import connectdb from "./src/db/db.js";
import dotenv from "dotenv"
dotenv.config({path:'./.env'})
const app = express();
app.use(express.json()); 

const PORT = process.env.PORT || 3000
app.get("/",(req,res)=>{
    res.send("hi")
  
})
app.listen(PORT,()=>{
    console.log("yes")
})
connectdb();

import userRouter from "./src/routes/auth.route.js"
app.use("/api/user",userRouter)

import ideaRoutes  from "./src/routes/idea.route.js"
app.use("/api/idea",ideaRoutes)

import commentRoutes from "./src/routes/comment.route.js";
app.use("/api/comment", commentRoutes)

import CollabRoute from "./src/routes/collaborationReq.route.js"
app.use("/api/collab",CollabRoute)