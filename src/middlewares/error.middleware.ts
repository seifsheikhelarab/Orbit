import type { Request, Response, NextFunction } from "express";
import {
    ResponseHandler,
    AppError,
    ErrorCode,
    HttpStatus
} from "../utils/response.js";
import logger from "../utils/logger.js";

/**
 * Global Error Handler Middleware
 * Catches all errors and formats them consistently.
 *
 * @param {Error | AppError} err - The error object.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} _next - The Express next function.
 * @returns {Response} The JSON error response.
 */
export const errorHandler = (
    err: Error | AppError,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction
) => {
    const path = `${req.method} ${req.path}`;
    const timestamp = new Date().toISOString();

    if (err instanceof AppError) {
        logger.error(
            `[${err.code}] ${err.message} - Code: ${err.code} - Path: ${path} - Time: ${timestamp}`
        );
        return ResponseHandler.error(
            res,
            err.message,
            err.code as ErrorCode,
            err.status,
            path,
            err.details
        );
    }

    // Handle Zod validation errors
    if (err.name === "ZodError" || (err as any).issues) {
        const zodErr = err as any;
        const issues = zodErr.errors || zodErr.issues || [];

        const details: Record<string, unknown> = Array.isArray(issues)
            ? issues.reduce((acc: Record<string, unknown>, error: any) => {
                  const errorPath = Array.isArray(error.path)
                      ? error.path.join(".")
                      : error.path;
                  acc[errorPath] = error.message;
                  return acc;
              }, {})
            : { error: "Unknown validation error" };

        logger.warn(`Validation error - Path: ${path}`);
        return ResponseHandler.error(
            res,
            "Validation failed",
            ErrorCode.VALIDATION_ERROR,
            HttpStatus.BAD_REQUEST,
            path,
            details
        );
    }

    // Handle generic errors
    logger.error(`Unhandled error: ${err.message} - Stack: ${err.stack}`);
    return ResponseHandler.error(
        res,
        process.env.NODE_ENV === "production"
            ? "An error occurred"
            : err.message,
        ErrorCode.SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
        path
    );
};

/**
 * 404 Not Found Middleware
 * Handles requests to non-existent routes.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
export const notFoundHandler = (req: Request, res: Response) => {
    const path = `${req.method} ${req.path}`;
    ResponseHandler.error(
        res,
        `Route ${path} not found`,
        ErrorCode.RESOURCE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
        path
    );
};

/**
 * Async handler wrapper for Express route handlers
 * Wraps async functions to catch errors and pass them to error handler.
 *
 * @param {Function} fn - The async route handler function.
 * @returns {Function} Express middleware function.
 */
export const asyncHandler = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
