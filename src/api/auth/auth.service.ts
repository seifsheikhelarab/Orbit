import { auth } from "../../utils/auth";
import {
    AuthenticationError,
    AppError,
    HttpStatus,
    ErrorCode
} from "../../utils/response";
import type { RegisterInput, LoginInput } from "./auth.schemas";
import { fromNodeHeaders } from "better-auth/node";
import type { Request } from "express";

export class AuthService {
    /**
     * Sign up a new user
     */
    static async signUp(data: RegisterInput) {
        try {
            const result = await auth.api.signUpEmail({
                body: {
                    email: data.email,
                    password: data.password,
                    name: data.name,
                    image: data.image
                }
            });
            return result;
        } catch (error: unknown) {
            const err = error as any;
            if (
                err.code === "USER_ALREADY_EXISTS" ||
                err.message?.includes("already exists")
            ) {
                throw new AppError(
                    "User with this email already exists",
                    HttpStatus.BAD_REQUEST,
                    ErrorCode.RESOURCE_ALREADY_EXISTS
                );
            }
            throw new AppError(
                err.message || "Failed to sign up",
                err.status || HttpStatus.INTERNAL_SERVER_ERROR,
                ErrorCode.SERVER_ERROR
            );
        }
    }

    /**
     * Sign in an existing user
     */
    static async signIn(data: LoginInput) {
        try {
            const result = await auth.api.signInEmail({
                body: {
                    email: data.email,
                    password: data.password
                }
            });
            return result;
        } catch (error: unknown) {
            const err = error as any;
            if (
                err.status === 401 ||
                err.code === "INVALID_EMAIL_OR_PASSWORD" ||
                err.message === "Invalid email or password"
            ) {
                throw new AuthenticationError("Invalid email or password");
            }
            throw new AppError(
                err.message || "Failed to sign in",
                err.status || HttpStatus.INTERNAL_SERVER_ERROR,
                ErrorCode.SERVER_ERROR
            );
        }
    }

    /**
     * Sign out the current user
     */
    static async signOut(headers: Request["headers"]) {
        try {
            await auth.api.signOut({
                headers: fromNodeHeaders(headers)
            });
        } catch {
            throw new AppError(
                "Failed to sign out",
                HttpStatus.INTERNAL_SERVER_ERROR,
                ErrorCode.SERVER_ERROR
            );
        }
    }

    /**
     * Get current user session
     */
    static async getSession(headers: Request["headers"]) {
        try {
            const session = await auth.api.getSession({
                headers: fromNodeHeaders(headers)
            });
            return session;
        } catch {
            return null;
        }
    }
}
