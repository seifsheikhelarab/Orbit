import { Router } from "express";
import * as authController from "./auth.controller";
import * as authSchema from "./auth.schemas";
import { validateRequest } from "../../middlewares/validation.middleware";

const router = Router();

router.post(
    "/register",
    validateRequest(authSchema.registerSchema),
    authController.handleSignUp
);
router.post(
    "/login",
    validateRequest(authSchema.loginSchema),
    authController.handleSignIn
);
router.post("/logout", authController.handleSignOut);
router.get("/me", authController.handleGetMe);

export default router;
