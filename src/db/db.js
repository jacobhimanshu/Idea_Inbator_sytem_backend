import mongoose from "mongoose";
import { DB_NAME } from "../utility/constant.js";
const connectdb = async () => {
  try {
    const connectInstant = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );
    console.log("your database hasbeen connected");
  } catch (error) {
    console.log("getting error while connecting the database", error.message);
  }
};

export default connectdb;
