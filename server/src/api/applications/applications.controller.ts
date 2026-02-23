import type { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/error.middleware";
import { AuthService } from "../auth/auth.service";
import * as ApplicationsService from "./applications.service";
import { ResponseHandler } from "../../utils/response";
import { getPagination } from "../../utils/pages";

export const getApplications = asyncHandler(
    async (req: Request, res: Response) => {
        const session = await AuthService.getSession(req.headers);
        const { page, limit, skip, take } = getPagination(
            {
                page: req.query.page as string,
                limit: req.query.limit as string
            },
            10
        );

        const result = await ApplicationsService.getApplications(
            session!.user.id,
            skip,
            take
        );

        if (result) {
            ResponseHandler.paginated(
                res,
                result.applications,
                "Applications retrieved successfully",
                Number(page),
                limit,
                result.total,
                req.originalUrl
            );
        }
    }
);
