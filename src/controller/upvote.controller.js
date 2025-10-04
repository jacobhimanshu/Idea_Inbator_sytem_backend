import { Idea } from "../models/idea.model.js";

const toggleUpvote = async (req, res) => {
  try {
    const ideaId = req.params.id;
    const userId = req.user.id; // login से आएगा

    const idea = await Idea.findById(ideaId);
    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }

    // check अगर पहले से user upvote कर चुका है
    const index = idea.upvotes.indexOf(userId);

    if (index === -1) {
      // upvote add करो
      idea.upvotes.push(userId);
      await idea.save();
      return res.status(200).json({
        success: true,
        message: "Idea upvoted",
        totalUpvotes: idea.upvotes.length
      });
    } else {
      // अगर पहले से upvoted है तो हटाओ (toggle system)
      idea.upvotes.splice(index, 1);
      await idea.save();
      return res.status(200).json({
        success: true,
        message: "Upvote removed",
        totalUpvotes: idea.upvotes.length
      });
    }
  } catch (error) {
    console.error("Error in upvote:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export { toggleUpvote };
