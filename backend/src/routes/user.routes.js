import { Router } from "express";
import { loginUser, logoutUser, registerUser, verifyToken } from "../controllers/user.controller.js";
import { fileUploader } from "../middlewares/fileUploader.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/signup").post(
    fileUploader("profile"),
    registerUser
);

router.route("/login").post(loginUser);


// Secured routes

router.route("/logout").post(verifyJwt, logoutUser);

router.route("/verify-token").get(verifyJwt, verifyToken);

export default router