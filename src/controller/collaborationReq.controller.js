import { CollaborationRequest } from "../models/collaborationReq.model.js";

//sending the collab req
const collaborationReq = async (req, res) => {
  try {
    const { idea, receiver, message } = req.body;
           
    if (!idea || !receiver) {
      return res
        .status(400)
        .json({ success: false, message: "Idea and Receiver are required" });
    }

    const newReq = await CollaborationRequest.create({
      idea,
      sender: req.user.id,
      receiver,
      message,
    });
    return res.status(201).json({
      success: true,
      message: "Collaboration request sent",
      request: newReq,
    });
  } catch (error) {
    console.error("Error sending collab request:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

//get all the  collab req
const getmycollaborationReq = async (req, res) => {
  try {
    
    const request = await CollaborationRequest.find({ receiver: req.user._id })
    // const request = await CollaborationRequest.find({
    //   $or: [{ receiver: userId }, { sender: userId }]   //  sent + received दोनों
    // })
      .populate("idea", "title")
      .populate("sender", "name email")
       .populate("receiver", "name email");

    return res.status(200).json({
      success: true,
      request,
    });
  } catch (error) {
    console.error("Error fetching collab requ:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const AcceptCollReq = async (req, res) => {
  try {
    const { reqId } = req.params;
    //   console.log("reqid",reqId)
    const requ = await CollaborationRequest.findById(reqId);
    if (!requ) {
      return res.status(400).json({
        message: "Req not found",
      });
    }
    requ.status = "accepted";
    await requ.save();
    return res.status(200).json({
      success: true,
      message: "Collaboration request accepted succesffully",
      requ,
    });
  } catch (error) {
    console.error("Error accepting collab req:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const RejCollReq = async (req, res) => {
  try {
    const { reqId } = req.params;
    const requ = await CollaborationRequest.findById(reqId);
    if (!requ) {
      return res.status(400).json({
        message: "Req not found",
      });
    }
    requ.status = "rejected";
    await requ.save();
    return res.status(200).json({
      success: true,
      message: "Collaboration request rejected",
      requ,
    });
  } catch (error) {
    console.error("Error rejecting collab request:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export { collaborationReq, RejCollReq, AcceptCollReq, getmycollaborationReq };
