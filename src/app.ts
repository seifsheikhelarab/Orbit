import "dotenv/config";
import express, { type Application } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./utils/auth";
import logger from "./utils/logger";
import prisma from "./utils/prisma";
import authRouter from "./api/auth/auth.routes";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware";
import apiRouter from "./api";

/**
 * Default Express app
 *
 * @type {Express.Application}
 */
const app: Application = express();
/**
 * Local Port to run the app
 *
 * @type {number}
 */
const port: string | number = process.env.PORT || 5726;

// Express middleware initialization
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// BetterAuth
app.use("/api/auth", authRouter);
app.all("/api/auth/*splat", toNodeHandler(auth));

// Application routes
app.use("/api", apiRouter);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

/**
 * Start the Express server after verifying database connectivity.
 *
 * @returns A promise that resolves after startup hooks are registered.
 */
export async function startServer(): Promise<void> {
    try {
        // Test database connection
        await prisma.$queryRaw`SELECT 1`;
        logger.info("[Init] Database connected successfully");

        const server = app.listen(port, async () => {
            logger.info(`[Init] Server running on port ${port}`);
        });

        /**
         * Graceful Shutdown
         */
        process.on("SIGTERM", async () => {
            logger.info("SIGTERM received, shutting down gracefully...");
            server.close(async () => {
                await prisma.$disconnect();
                logger.info("Server closed");
                process.exit(0);
            });
        });

        process.on("SIGINT", async () => {
            logger.info("SIGINT received, shutting down gracefully...");
            server.close(async () => {
                await prisma.$disconnect();
                logger.info("Server closed");
                process.exit(0);
            });
        });
    } catch (err) {
        logger.error(`Failed to start server: ${err}`);
        process.exit(1);
    }
}

export default app;
