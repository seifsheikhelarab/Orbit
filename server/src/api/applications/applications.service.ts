import prisma from "../../utils/prisma";
import { AppError, NotFoundError } from "../../utils/response";

export async function getApplications(
    userId: string,
    skip: number,
    take: number
) {
    try {
        const applications = await prisma.jobApplication.findMany({
            where: { userId },
            skip,
            take
        });

        const total = await prisma.jobApplication.count({
            where: { userId }
        });

        if (applications.length === 0) {
            throw new NotFoundError("No applications found for this user");
        }

        return { applications, total };
    } catch (error: unknown) {
        if (error instanceof AppError) throw error;
        throw new AppError(
            `Failed to retrieve applications ${error}`,
            500,
            "INTERNAL_SERVER_ERROR"
        );
    }
}
