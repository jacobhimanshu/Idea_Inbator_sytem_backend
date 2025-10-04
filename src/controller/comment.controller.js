import { Comment } from "../models/comment.models.js";
import { Idea } from "../models/idea.model.js";

const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { ideaId } = req.params;
    //   console.log("text",text,"idea",ideaId)
    if (!text) {
      return res.status(400).json({ message: "comment text is required" });
    }
    const idea = await Idea.findById(ideaId);
    if (!idea) {
      return res.status(400).json({ message: "Idea not found" });
    }
    // console.log("yess riunng");
    const comment = await Comment.create({
      text,
      idea: ideaId,
      author: req.user._id,
    });
    // console.log(comment);
    return res
      .status(201)
      .json({ message: "comment added successfully", success: true, comment });
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).json({ message: "Error adding comment" });
  }
};

const getCommentsByIdea = async (req, res) => {
  try {
    const { ideaId } = req.params;

    const comments = await Comment.find({ idea: ideaId })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res.status(500).json({ message: "Error fetching comments" });
  }
};

const updatecomment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    // console.log("commentid",commentId,"text",text)
    const comment = await Comment.findById(commentId);
    // console.log("comment",comment)


    if (!comment) {
      return res.status(400).json({ message: "comment not found" });
    }
    if (comment.author.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to edit this comment",
      });
    }
    comment.text = text || comment.text;
    await comment.save();
    return res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      comment,
    });
  } catch (error) {
    console.error("Error updating comment:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error updating comment" });
  }
};

const deletecomment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    // console.log("comenid",commentId,"comem",comment)
    if (!comment) {
      return res
        .status(400)
        .json({ message: "comment not found", success: false });
    }
    if (comment.author.toString() !== req.user.id.toString()) {
      return res
        .status(400)
        .json({ message: "you are not allowed to deleted" });
    }
    await comment.deleteOne();
    return res
      .status(200)
      .json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error deleting comment" });
  }
};

export { addComment, deletecomment, getCommentsByIdea, updatecomment };
