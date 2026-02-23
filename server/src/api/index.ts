import { Router } from "express";
import { router as applicationsRouter } from "./applications/applications.routes";

export const apiRouter = Router();

apiRouter.use("/applications", applicationsRouter);

export default apiRouter;
