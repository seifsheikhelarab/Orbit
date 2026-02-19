import "dotenv/config";
import express, { type Application } from "express";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./utils/auth";
import logger from "./utils/logger";
import prisma from "./utils/prisma";

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
const port = process.env.PORT || 5726;

// BetterAuth
app.all("/api/v1/auth/*splat", toNodeHandler(auth));
app.get("/api/v1/me", async (req, res) => {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
    });
    return res.json(session);
});

// Express middleware initialization
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));


/**
 * Server to run express app
 *
 * @export
 * @async
 * @returns {Promise<void>} 
 */
export async function startServer(): Promise<void> {
    try {
        // Test database connection
        await prisma.$queryRaw`SELECT 1`;
        logger.info("[Init] Database connected successfully");

        const server = app.listen(port, async () => {
            logger.info(
                `[Init] Server running on port ${port}`
            );
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