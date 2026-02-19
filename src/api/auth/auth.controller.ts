import { asyncHandler } from "./../../middlewares/error.middleware";
import { type Request, type Response } from "express";
import { AuthService } from "./auth.service";
import {
    ResponseHandler,
    HttpStatus,
    AuthenticationError
} from "../../utils/response";

/**
 * Handle user registration
 */
export const handleSignUp = asyncHandler(
    async (req: Request, res: Response) => {
        const result = await AuthService.signUp(req.body);

        return ResponseHandler.created(
            res,
            "User registered successfully",
            result,
            req.originalUrl
        );
    }
);

/**
 * Handle user login
 */
export const handleSignIn = asyncHandler(
    async (req: Request, res: Response) => {
        const result = await AuthService.signIn(req.body);

        return ResponseHandler.success(
            res,
            "Login successful",
            HttpStatus.OK,
            result,
            req.originalUrl
        );
    }
);

/**
 * Handle user logout
 */
export const handleSignOut = asyncHandler(
    async (req: Request, res: Response) => {
        await AuthService.signOut(req.headers);

        return ResponseHandler.success(
            res,
            "Logout successful",
            HttpStatus.OK,
            null,
            req.originalUrl
        );
    }
);

/**
 * Handle getting current user info
 */
export const handleGetMe = asyncHandler(async (req: Request, res: Response) => {
    const session = await AuthService.getSession(req.headers);

    if (!session) {
        throw new AuthenticationError("No active session found");
    }

    return ResponseHandler.success(
        res,
        "Current user session retrieved",
        HttpStatus.OK,
        session,
        req.originalUrl
    );
});
