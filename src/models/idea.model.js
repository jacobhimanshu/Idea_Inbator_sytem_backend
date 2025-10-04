import mongoose from "mongoose";

const ideaSchema = new mongoose.Schema(
  {
    title: 
    { type: String,
         required: true
      },
    shortDescription: 
    { type: String, 
        required: true
     },
    fullDescription: {
     type: String,
   required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
   upvotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },

  { timestamps: true },
);

export const Idea = mongoose.model("Idea",ideaSchema)