import { Router } from "express"
import { createIdea, deleteIdea, getAllIdea, getIdeaByid, updateIdea } from "../controller/idea.controller.js"
import { verifyjwt } from "../middleware/auth.middleware.js"
import { toggleUpvote } from "../controller/upvote.controller.js";
const router = Router()

router.route("/create").post(verifyjwt,createIdea);
router.route("/all").get(verifyjwt,getAllIdea);
router.route("/:id").get(verifyjwt,getIdeaByid)
router.route("/update/:id").put(verifyjwt,updateIdea)
router.route("/delete/:id").delete(verifyjwt,deleteIdea)



//for the upvotee 
router.route("/:id/upvote").post(verifyjwt,toggleUpvote)

export default router;