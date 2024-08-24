import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { fileUploader } from "../middlewares/fileUploader.middleware.js";

const router = Router()

router.route("/signup").post(
    fileUploader("profile"),
    registerUser
);

router.route("/login").post(
    registerUser
);

export default router