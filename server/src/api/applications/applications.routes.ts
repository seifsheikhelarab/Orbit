import { Router } from "express";
import { protect } from "../../middlewares/auth.middleware";
import * as applicationsController from "./applications.controller";

export const router = Router();

// Protect all routes in this router
router.use(protect);

router.get("/", applicationsController.getApplications);
