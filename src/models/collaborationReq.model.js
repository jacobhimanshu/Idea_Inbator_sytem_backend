import mongoose from "mongoose";

const collaborationRequestSchema = new mongoose.Schema(
  {
    idea: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Idea",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const CollaborationRequest = mongoose.model(
  "CollaborationRequest",
  collaborationRequestSchema
);
