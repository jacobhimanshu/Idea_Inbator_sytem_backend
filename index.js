import express from "express";
import connectdb from "./src/db/db.js";
import dotenv from "dotenv";
import cors from "cors"; // <-- Import cors

dotenv.config({ path: "./.env" });
const app = express();

// Setup CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", // frontend URL
    credentials: true,
  })
);

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("hi");
});
app.listen(PORT, () => {
  console.log("yes");
});
connectdb();

import userRouter from "./src/routes/auth.route.js";
app.use("/api/user", userRouter);

import ideaRoutes from "./src/routes/idea.route.js";
app.use("/api/idea", ideaRoutes);

import commentRoutes from "./src/routes/comment.route.js";
app.use("/api/comment", commentRoutes);

import CollabRoute from "./src/routes/collaborationReq.route.js";
app.use("/api/collab", CollabRoute);
