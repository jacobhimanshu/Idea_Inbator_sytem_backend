
import { Router } from "express"
import { verifyjwt } from "../middleware/auth.middleware.js";
import { AcceptCollReq, collaborationReq, getmycollaborationReq, RejCollReq } from "../controller/collaborationReq.controller.js";
const router = Router();

router.route("/").post(verifyjwt,collaborationReq);
router.route("/").get(verifyjwt,getmycollaborationReq);
router.route("/:reqId/accept").put(verifyjwt,AcceptCollReq);
router.route("/:reqId/reject").put(verifyjwt,RejCollReq);

export default router;