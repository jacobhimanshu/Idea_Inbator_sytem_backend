import { Router } from "express";
import { addComment, deletecomment, getCommentsByIdea, updatecomment } from "../controller/comment.controller.js";
import { verifyjwt } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/:ideaId").post(verifyjwt,addComment)
router.route("/:ideaId").get(getCommentsByIdea)

router.route("/:commentId").put(verifyjwt,updatecomment);
router.route("/:commentId").delete(verifyjwt,deletecomment);
export default router 