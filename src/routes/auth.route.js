import { Router } from "express";
import { loginUser, regesterUser } from "../controller/auth.controller.js";
// import { verifyjwt } from "../middleware/auth.middleware.js";

const router = Router();
router.route("/register").post(regesterUser);
router.route("/login").post(loginUser)

export default router;